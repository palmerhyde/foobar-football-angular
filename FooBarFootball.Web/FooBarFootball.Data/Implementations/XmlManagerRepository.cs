using FooBarFootball.Data.Helpers;
using FooBarFootball.Data.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Xml;

namespace FooBarFootball.Data.Implementations
{
    public class XmlManagerRepository : IManagerRepository
    {
        private string managerEndPoint;

        public XmlManagerRepository(string url)
        {
            managerEndPoint = url;
        }

        public IList<Card> Get()
        {
            List<Card> cards = new List<Card>();
            if (!cache.Contains("ManagerCards"))
            {
                cards = LoadCards();
                cache.Add(new CacheItem("ManagerCards", cards), new CacheItemPolicy());
            }
            else
            {
                cards = (List<Card>)cache.Get("ManagerCards");
            }

            return cards;
        }

        private List<Card> LoadCards()
        {
            XmlDocument document = new XmlDocument();
            document.Load(managerEndPoint);
            string xml = document.InnerXml;
            List<Card> cards = XmlHelper.Deserialize<List<Card>>(xml);
            return cards;
        }

        public Card Get(string id)
        {
            var manager = (from x in Get()
                          where x.Id == int.Parse(id)
                          select x).FirstOrDefault();

            return manager;
        }

        public static ObjectCache cache = MemoryCache.Default;
    }
}