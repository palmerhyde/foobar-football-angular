using FooBarFootball.Data.Helpers;
using FooBarFootball.Data.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Xml;

namespace FooBarFootball.Data.Implementations
{
    public class XmlPlayer2Repository : IPlayer2Repository
    {
        private string playerEndPoint;

        public XmlPlayer2Repository(string url)
        {
            playerEndPoint = url;
        }
        
        public IList<Card> Get()
        {
            List<Card> cards = new List<Card>();
            if (!cache.Contains("Player2Cards"))
            {
                cards = LoadCards();
                cache.Add(new CacheItem("Player2Cards", cards), new CacheItemPolicy());
            }
            else
            {
                cards = (List<Card>)cache.Get("Player2Cards");
            }

            return cards;
        }

        private List<Card> LoadCards()
        {
            XmlDocument document = new XmlDocument();
            document.Load(playerEndPoint);
            string xml = document.InnerXml;
            List<Card> cards = XmlHelper.Deserialize<List<Card>>(xml);
            return cards;
        }

        public Card Get(string id)
        {
            var player = (from x in Get()
                         where x.Id == int.Parse(id)
                         select x).FirstOrDefault();

            return player;
        }

        public static ObjectCache cache = MemoryCache.Default;
    }
}