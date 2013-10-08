using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium;
using System.Diagnostics;
using FooBarFootball.Models;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Xml;
using System.Xml.Serialization;

namespace FoobarFootball.Tests.Automation
{
    [TestClass]
    public class ImportPlayers
    {
        List<PlayerCard> cardsList = new List<PlayerCard>();
        FirefoxDriver browser = new FirefoxDriver();

        [TestMethod]
        public void GetPlayers()
        {
            // Get list of teams
            browser.Navigate().GoToUrl("http://www.futhead.com/14/clubs/");
            var clubs = browser.FindElement(By.ClassName("club-table"));
            var clubLinks = clubs.FindElements(By.TagName("a"));

            List<string> hrefs = new List<string>();

            foreach (var a in clubLinks)
            {
                hrefs.Add(a.GetAttribute("href"));
            }
            
            foreach (var href in hrefs)
            {
                GetTeam(href);
                
                browser.Navigate().GoToUrl("http://www.futhead.com/14/clubs/");
            }

            string xml = Serialize(cardsList).ToString();
            XmlDocument xdoc = new XmlDocument();
            xdoc.LoadXml(xml);
            xdoc.Save("players.xml");
            browser.Close();
        }

        public void GetTeam(string url)
        {
            browser.Navigate().GoToUrl(url);
            var cards = browser.FindElementsByClassName("playercard");
           
            foreach (var card in cards)
            {
                try
                {
                    var nameElement = card.FindElement(By.ClassName("playercard-name"));
                    var name = card.GetAttribute("data-player-full-name");
                    var shortName = card.GetAttribute("data-player-short-name");
                    var position = card.FindElement(By.ClassName("playercard-position"));
                    var photoUrl = card.FindElement(By.ClassName("playercard-picture")).FindElement(By.TagName("img"));
                    var club = card.FindElement(By.ClassName("playercard-club")).FindElement(By.TagName("img"));
                    var nation = card.FindElement(By.ClassName("playercard-nation")).FindElement(By.TagName("img"));
                    var attr1 = card.FindElement(By.ClassName("playercard-attr1"));
                    var attr2 = card.FindElement(By.ClassName("playercard-attr2"));
                    var attr3 = card.FindElement(By.ClassName("playercard-attr3"));
                    var attr4 = card.FindElement(By.ClassName("playercard-attr4"));
                    var attr5 = card.FindElement(By.ClassName("playercard-attr5"));
                    var attr6 = card.FindElement(By.ClassName("playercard-attr6"));
                    PlayerCard cardImport = new PlayerCard();
                    cardImport.Name = name;
                    cardImport.ShortName = shortName;
                    cardImport.Position = ConvertPosition(position.Text);
                    cardImport.Club = club.GetAttribute("src");
                    cardImport.PictureUrl = photoUrl.GetAttribute("src");
                    cardImport.Nation = nation.GetAttribute("src");
                    cardImport.PlayerAttributes = new List<PlayerAttributeValue>();
                    if (cardImport.Position == PlayerPosition.Goalkeeper)
                    {
                        cardImport.PlayerAttributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Diving, Value = int.Parse(attr1.Text.Split(' ')[0]) });
                        cardImport.PlayerAttributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Handling, Value = int.Parse(attr2.Text.Split(' ')[0]) });
                        cardImport.PlayerAttributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Kicking, Value = int.Parse(attr3.Text.Split(' ')[0]) });
                        cardImport.PlayerAttributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Reflexes, Value = int.Parse(attr4.Text.Split(' ')[0]) });
                        cardImport.PlayerAttributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.OneOnOnes, Value = int.Parse(attr5.Text.Split(' ')[0]) });
                        cardImport.PlayerAttributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Positioning, Value = int.Parse(attr6.Text.Split(' ')[0]) });
                    }
                    else
                    {
                        cardImport.PlayerAttributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Pace, Value = int.Parse(attr1.Text.Split(' ')[0]) });
                        cardImport.PlayerAttributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Shooting, Value = int.Parse(attr2.Text.Split(' ')[0]) });
                        cardImport.PlayerAttributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Passing, Value = int.Parse(attr3.Text.Split(' ')[0]) });
                        cardImport.PlayerAttributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Dribbling, Value = int.Parse(attr4.Text.Split(' ')[0]) });
                        cardImport.PlayerAttributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Defending, Value = int.Parse(attr5.Text.Split(' ')[0]) });
                        cardImport.PlayerAttributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Heading, Value = int.Parse(attr6.Text.Split(' ')[0]) });
                    }

                    cardsList.Add(cardImport);
                }
                catch (Exception)
                {
                }
            }       
        }

        public static StringWriter Serialize(object o)
        {
            var xs = new XmlSerializer(o.GetType());
            var xml = new StringWriter();
            xs.Serialize(xml, o);

            return xml;
        }

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
    }
}
