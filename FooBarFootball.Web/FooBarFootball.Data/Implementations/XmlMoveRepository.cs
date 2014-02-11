using FooBarFootball.Data.Helpers;
using FooBarFootball.Data.Interfaces;
using FooBarFootball.Models;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Xml;

namespace FooBarFootball.Data.Implementations
{
    public class XmlMoveRepository : IMoveRepository
    {
        private string moveEndPoint;

        public XmlMoveRepository(string url)
        {
            moveEndPoint = url;
        }

        public IList<Card> Get()
        {
            List<Card> cards = new List<Card>();
            if (!cache.Contains("MoveCards"))
            {
                cards = LoadCards();
                cache.Add(new CacheItem("MoveCards", cards), new CacheItemPolicy());
            }
            else
            {
                cards = (List<Card>)cache.Get("MoveCards");
            }

            return cards;
        }

        private List<Card> LoadCards()
        {
            XmlDocument document = new XmlDocument();
            document.Load(moveEndPoint);
            string xml = document.InnerXml;
            List<Card> cards = XmlHelper.Deserialize<List<Card>>(xml);
            return cards;
        }

        public Card Get(string id)
        {
            var move = (from x in Get()
                          where x.Id == id
                          select x).FirstOrDefault();

            return move;
        }

        public static ObjectCache cache = MemoryCache.Default;
    }
}