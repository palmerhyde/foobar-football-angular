using FooBarFootball.Data.Helpers;
using FooBarFootball.Data.Interfaces;
using FooBarFootball.Models;
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

        public IList<ManagerCard> Get()
        {
            List<ManagerCard> cards = new List<ManagerCard>();
            if (!cache.Contains("ManagerCards"))
            {
                cards = LoadCards();
                cache.Add(new CacheItem("ManagerCards", cards), new CacheItemPolicy());
            }
            else
            {
                cards = (List<ManagerCard>)cache.Get("ManagerCards");
            }

            return cards;
        }

        private List<ManagerCard> LoadCards()
        {
            XmlDocument document = new XmlDocument();
            document.Load(managerEndPoint);
            string xml = document.InnerXml;
            List<ManagerCard> cards = XmlHelper.Deserialize<List<ManagerCard>>(xml);
            return cards;
        }

        public ManagerCard Get(string id)
        {
            var manager = (from x in Get()
                          where x.Id == id
                          select x).FirstOrDefault();

            return manager;
        }

        public static ObjectCache cache = MemoryCache.Default;
    }
}