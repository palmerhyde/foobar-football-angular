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

        public IList<MoveCard> Get()
        {
            List<MoveCard> cards = new List<MoveCard>();
            if (!cache.Contains("MoveCards"))
            {
                cards = LoadCards();
                cache.Add(new CacheItem("MoveCards", cards), new CacheItemPolicy());
            }
            else
            {
                cards = (List<MoveCard>)cache.Get("MoveCards");
            }

            return cards;
        }

        private List<MoveCard> LoadCards()
        {
            XmlDocument document = new XmlDocument();
            document.Load(moveEndPoint);
            string xml = document.InnerXml;
            List<MoveCard> cards = XmlHelper.Deserialize<List<MoveCard>>(xml);
            return cards;
        }

        public MoveCard Get(string id)
        {
            var move = (from x in Get()
                          where x.Id == id
                          select x).FirstOrDefault();

            return move;
        }

        public static ObjectCache cache = MemoryCache.Default;
    }
}