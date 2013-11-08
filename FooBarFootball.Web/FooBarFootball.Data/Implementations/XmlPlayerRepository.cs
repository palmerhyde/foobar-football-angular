using FooBarFootball.Data.Helpers;
using FooBarFootball.Data.Interfaces;
using FooBarFootball.Models;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Xml;

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
    }
}