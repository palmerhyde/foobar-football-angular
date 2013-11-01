using FooBarFootball.Data.Helpers;
using FooBarFootball.Data.Interfaces;
using FooBarFootball.Models;
using System.Collections.Generic;
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
                cache.Add(new CacheItem("PlayerCards", LoadCards()), new CacheItemPolicy());
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
            throw new System.NotImplementedException();
        }

        public static ObjectCache cache = MemoryCache.Default;
    }
}