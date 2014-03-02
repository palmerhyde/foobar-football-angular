using FooBarFootball.Data.Helpers;
using FooBarFootball.Data.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Data;
using System.Data.Entity;

namespace FooBarFootball.Data.Implementations
{
    public class SqlPlayerRepository : IPlayer2Repository
    {
        private FoobarfootballEntities db = new FoobarfootballEntities();

        public SqlPlayerRepository()
        {
            //db.Configuration.ProxyCreationEnabled = false;
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
            var card = db.Card.Include(c => c.CardClub1).Include(c => c.CardLeague1).Include(c => c.CardNation1).Include(c => c.CardPosition1).Include(c => c.CardRarity1).Include(c => c.CardStyle1).Include(c => c.CardType1);
            return card.ToList();
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