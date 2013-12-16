using FooBarFootball.Data.Helpers;
using FooBarFootball.Data.Interfaces;
using FooBarFootball.Models;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Xml;
using System;

namespace FooBarFootball.Data.Implementations
{
    public class XmlPlayerRepository : IPlayerRepository
    {
        private string playerEndPoint;

        public XmlPlayerRepository(string url)
        {
            playerEndPoint = url;
        }
        
        public IList<PlayerCard> Get()
        {
            List<PlayerCard> cards = new List<PlayerCard>();
            if (!cache.Contains("PlayerCards"))
            {
                cards = LoadCards();
                cache.Add(new CacheItem("PlayerCards", cards), new CacheItemPolicy());
            }
            else
            {
                cards = (List<PlayerCard>)cache.Get("PlayerCards");
            }

            return cards;
        }

        private List<PlayerCard> LoadCards()
        {
            XmlDocument document = new XmlDocument();
            document.Load(playerEndPoint);
            string xml = document.InnerXml;
            List<PlayerCard> cards = XmlHelper.Deserialize<List<PlayerCard>>(xml);
            
            foreach (var card in cards)
            {
                card.AttackingRating = calculateAttackingRating(card);
                card.DefensiveRating = calculateDefensiveRating(card);
                card.Strengths = calculateStrengths(card);
                card.Weaknesses = calculateWeaknesses(card);
            }
            
            return cards;
        }

        public PlayerCard Get(string id)
        {
            var player = (from x in Get()
                         where x.Id == id
                         select x).FirstOrDefault();

            return player;
        }

        public static ObjectCache cache = MemoryCache.Default;

        private int calculateAttackingRating(PlayerCard card)
        {
            if (card.OverallRating < 82 || (card.Position != PlayerPosition.Attacker && !attackingMidfielder(card)))
            {
                return 1;
            }
            else
            {
                return (int)Math.Ceiling(((double)card.OverallRating - 80) / 2);
            }
        }

        private int calculateDefensiveRating(PlayerCard card)
        {
            // slidinng scale for defenders will have to be different as they typically are less.
            if (card.OverallRating < 76 || (card.Position != PlayerPosition.Defender && card.Position != PlayerPosition.Goalkeeper && !defendingMidfielder(card)))
            {
                return 1;
            }
            else
            {
                return (int)Math.Ceiling(((double)card.OverallRating - 76) / 2);
            }
        }

        private bool attackingMidfielder(PlayerCard card)
        {
            return (card.Position == PlayerPosition.Midfielder && (card.PlayerAttributes.First(x => x.Attribute == PlayerAttribute.Shooting).Value > (card.PlayerAttributes.First(x => x.Attribute == PlayerAttribute.Defending).Value)));
        }

        private bool defendingMidfielder(PlayerCard card)
        {
            return (card.Position == PlayerPosition.Midfielder && (card.PlayerAttributes.First(x => x.Attribute == PlayerAttribute.Defending).Value > (card.PlayerAttributes.First(x => x.Attribute == PlayerAttribute.Shooting).Value)));
        }

        private List<PlayerAttributeValue> calculateStrengths(PlayerCard card)
        {
            var attributes = new List<PlayerAttributeValue>();
            
            var strengths = (from x in card.PlayerAttributes
                            where x.Value > card.OverallRating && !blackListedAttribute(x.Attribute)
                            orderby x.Value descending
                            select x).Take(3);

            foreach (var strength in strengths)
            {
                var attribute = new PlayerAttributeValue();
                attribute.Attribute = strength.Attribute;
                attribute.Value = strength.Value - card.OverallRating;
                attributes.Add(attribute);
            }

            return attributes;
        }

        private List<PlayerAttributeValue> calculateWeaknesses(PlayerCard card)
        {
            var attributes = new List<PlayerAttributeValue>();

            var weaknesses = (from x in card.PlayerAttributes
                             where x.Value < card.OverallRating && !blackListedAttribute(x.Attribute)
                             orderby x.Value
                             select x).Take(1);

            foreach (var weakness in weaknesses)
            {
                var attribute = new PlayerAttributeValue();
                attribute.Attribute = weakness.Attribute;
                attribute.Value = (int)Math.Ceiling(((double)card.OverallRating - weakness.Value) / 10);
                attributes.Add(attribute);
            }

            return attributes;
        }

        private bool blackListedAttribute(PlayerAttribute attribute)
        {
            if (attribute == PlayerAttribute.Unknown || 
                attribute == PlayerAttribute.Stamina || 
                attribute == PlayerAttribute.SprintSpeed || 
                attribute == PlayerAttribute.Acceleration || 
                attribute == PlayerAttribute.ShotPower || 
                attribute == PlayerAttribute.Curve)
            {
                return true;
            }

            return false;
        }
    }
}