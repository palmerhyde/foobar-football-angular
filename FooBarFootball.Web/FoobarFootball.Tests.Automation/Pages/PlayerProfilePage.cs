using FooBarFootball.Models;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.PageObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoobarFootball.Tests.Automation.Pages
{
    public class PlayerProfilePage
    {
        IWebDriver _driver;
        string url = "http://www.futhead.com/14/players/{0}/";

        public PlayerProfilePage(IWebDriver driver, int playerId)
        {
            if (driver == null)
            {
                throw new ArgumentNullException("driver");
            }

            if (playerId <= 0)
            {
                throw new ArgumentOutOfRangeException("playerId");
            }

            _driver = driver;
            _driver.Navigate().GoToUrl(string.Format(url, playerId));
        }
        
        // Elements
        private IWebElement PlayerCardElement()
        {
            return _driver.FindElement(By.ClassName("playercard"));
        }

        private IWebElement OverallRatingElement()
        {
            return PlayerCardElement().FindElement(By.ClassName("playercard-rating"));
        }

        private IWebElement PlayerNameElement()
        {
            return PlayerCardElement().FindElement(By.ClassName("playercard-name"));
        }

        private IWebElement PlayerPositionElement()
        {
            return PlayerCardElement().FindElement(By.ClassName("playercard-position"));
        }

        private IWebElement PlayerPhotoElement()
        {
            return PlayerCardElement().FindElement(By.ClassName("playercard-picture")).FindElement(By.TagName("img"));
        }
        
        private IWebElement PlayerClubElement()
        {
            return PlayerCardElement().FindElement(By.ClassName("playercard-club")).FindElement(By.TagName("img"));
        }

        private IWebElement PlayerNationElement()
        {
            return PlayerCardElement().FindElement(By.ClassName("playercard-nation")).FindElement(By.TagName("img"));
        }

        private IWebElement PlayerAttribute1Element()
        {
            return PlayerCardElement().FindElement(By.ClassName("playercard-attr1"));
        }

        private IWebElement PlayerAttribute2Element()
        {
            return PlayerCardElement().FindElement(By.ClassName("playercard-attr2"));
        }

        private IWebElement PlayerAttribute3Element()
        {
            return PlayerCardElement().FindElement(By.ClassName("playercard-attr3"));
        }

        private IWebElement PlayerAttribute4Element()
        {
            return PlayerCardElement().FindElement(By.ClassName("playercard-attr4"));
        }

        private IWebElement PlayerAttribute5Element()
        {
            return PlayerCardElement().FindElement(By.ClassName("playercard-attr5"));
        }

        private IWebElement PlayerAttribute6Element()
        {
            return PlayerCardElement().FindElement(By.ClassName("playercard-attr6"));
        }
        
        private IList<IWebElement> PlayerAttributeListElement()
        {
            return _driver.FindElements(By.ClassName("attr"));
        }

        public PlayerCard Card()
        {
            var playerCard = new PlayerCard();
            playerCard.Id = PlayerCardElement().GetAttribute("data-player-id");
            playerCard.PlayerDataUrl = _driver.Url;
            playerCard.Name = PlayerCardElement().GetAttribute("data-player-full-name");
            playerCard.ShortName = PlayerCardElement().GetAttribute("data-player-short-name");
            playerCard.OverallRating = int.Parse(OverallRatingElement().Text);
            playerCard.Position = ConvertPosition(PlayerPositionElement().Text);
            playerCard.PictureUrl = PlayerPhotoElement().GetAttribute("src");
            playerCard.Club = PlayerClubElement().GetAttribute("src");
            playerCard.Nation = PlayerNationElement().GetAttribute("src");
            playerCard.PlayerAttributes = GetAttributes(playerCard.Position);
            return playerCard;
        }
       
        // TODO: Move to helper class
        public List<PlayerAttributeValue> GetAttributes(PlayerPosition positon)
        {
            var attributes = new List<PlayerAttributeValue>();
            if (positon == PlayerPosition.Goalkeeper)
            {
                attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Diving, Value = int.Parse(PlayerAttribute1Element().Text.Split(' ')[0]) });
                attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Handling, Value = int.Parse(PlayerAttribute2Element().Text.Split(' ')[0]) });
                attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Kicking, Value = int.Parse(PlayerAttribute3Element().Text.Split(' ')[0]) });
                attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Reflexes, Value = int.Parse(PlayerAttribute4Element().Text.Split(' ')[0]) });
                attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.OneOnOnes, Value = int.Parse(PlayerAttribute5Element().Text.Split(' ')[0]) });
                attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Positioning, Value = int.Parse(PlayerAttribute6Element().Text.Split(' ')[0]) });
            }
            else
            {
                // Basic attributes
                attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Pace, Value = int.Parse(PlayerAttribute1Element().Text.Split(' ')[0]) });
                attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Shooting, Value = int.Parse(PlayerAttribute2Element().Text.Split(' ')[0]) });
                attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Passing, Value = int.Parse(PlayerAttribute3Element().Text.Split(' ')[0]) });
                attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Dribbling, Value = int.Parse(PlayerAttribute4Element().Text.Split(' ')[0]) });
                attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Defending, Value = int.Parse(PlayerAttribute5Element().Text.Split(' ')[0]) });
                attributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Heading, Value = int.Parse(PlayerAttribute6Element().Text.Split(' ')[0]) });

               // extended attributes
                foreach (var attribute in PlayerAttributeListElement())
                {
                    try
                    {
                        var attributeValue = attribute.FindElement(By.TagName("p"));
                        var attributeName = attribute.FindElement(By.TagName("span"));
                        attributes.Add(new PlayerAttributeValue() { Attribute = ConvertAttribute(attributeName.Text), Value = int.Parse(attributeValue.Text) });
                    }
                    catch (Exception)
                    {
                    }
                }
            }
            
            return attributes;
        }

        // TODO: Move to helper class
        public static PlayerPosition ConvertPosition(string position)
        {
            switch (position)
            {
                case "LB":
                case "LWB":
                case "CB":
                case "RB":
                case "RWB":
                    return PlayerPosition.Defender;
                case "CAM":
                case "LM":
                case "CM":
                case "CDM":
                case "RM":
                    return PlayerPosition.Midfielder;
                case "LW":
                case "RW":
                case "ST":
                case "CF":
                case "LF":
                case "RF":
                    return PlayerPosition.Attacker;
                default: return PlayerPosition.Goalkeeper;
            }
        }

        // TODO: Move to helper class
        public static PlayerAttribute ConvertAttribute(string attribute)
        {
            switch (attribute.ToLower())
            {
                case "ball control":
                    return PlayerAttribute.BallControl;
                case "crossing":
                    return PlayerAttribute.Crossing;
                case "curve":
                    return PlayerAttribute.Curve;
                case "finishing":
                    return PlayerAttribute.Finishing;
                case "free kick accuracy":
                    return PlayerAttribute.FreeKickAccuracy;
                case "heading accuracy":
                    return PlayerAttribute.HeadingAccuracy;
                case "long passing":
                    return PlayerAttribute.LongPassing;
                case "long shots":
                    return PlayerAttribute.LongShots;
                case "marking":
                    return PlayerAttribute.Marking;
                case "penalties":
                    return PlayerAttribute.Penalties;
                case "short passing":
                    return PlayerAttribute.ShortPassing;
                case "shot power":
                    return PlayerAttribute.ShotPower;
                case "sliding tackle":
                    return PlayerAttribute.SlidingTackle;
                case "standing tackle":
                    return PlayerAttribute.StandingTackle;
                case "volleys":
                    return PlayerAttribute.Volleys;
                case "acceleration":
                    return PlayerAttribute.Acceleration;
                case "agility":
                    return PlayerAttribute.Agility;
                case "balance":
                    return PlayerAttribute.Balance;
                case "jumping":
                    return PlayerAttribute.Jumping;
                case "reactions":
                    return PlayerAttribute.Reactions;
                case "sprint speed":
                    return PlayerAttribute.SprintSpeed;
                case "stamina":
                    return PlayerAttribute.Stamina;
                case "strength":
                    return PlayerAttribute.Strength;
                case "aggression":
                    return PlayerAttribute.Aggression;
                case "positioning":
                    return PlayerAttribute.Positioning;
                case "interceptions":
                    return PlayerAttribute.Interceptions;
                case "vision":
                    return PlayerAttribute.Vision;
                default:
                    return PlayerAttribute.Unknown;
            }
        }
    }
}
