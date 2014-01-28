using FooBarFootball.Data.Helpers;
using FooBarFootball.Data.Interfaces;
using FooBarFootball.Models;
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
        
        public IList<PlayerCard2> Get()
        {
            List<PlayerCard2> cards = new List<PlayerCard2>();
            if (!cache.Contains("Player2Cards"))
            {
                cards = LoadCards();
                cache.Add(new CacheItem("Player2Cards", cards), new CacheItemPolicy());
            }
            else
            {
                cards = (List<PlayerCard2>)cache.Get("Player2Cards");
            }

            return cards;
        }

        private List<PlayerCard2> LoadCards()
        {
            XmlDocument document = new XmlDocument();
            document.Load(playerEndPoint);
            string xml = document.InnerXml;
            List<PlayerCard2> cards = XmlHelper.Deserialize<List<PlayerCard2>>(xml);
            return cards;
        }

        public PlayerCard2 Get(string id)
        {
            var player = (from x in Get()
                         where x.Id == id
                         select x).FirstOrDefault();

            return player;
        }

        public static ObjectCache cache = MemoryCache.Default;
    }
}