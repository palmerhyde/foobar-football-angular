using FooBarFootball.Data;
using FooBarFootball.Data.Implementations;
using FooBarFootball.Data.Interfaces;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Linq;
using System.Data.Entity;

namespace FooBarFootball.Web.Controllers
{
    public class TacticsController : ApiController
    {
        private ITacticRepository _tacticRepo;

        public TacticsController(ITacticRepository tacticRepo)
        {
            _tacticRepo = tacticRepo;
            FoobarfootballEntities data = new FoobarfootballEntities();
            var x = from a in data.CardType
                    select a;

            foreach (var item in x)
            {
                string p = item.Name;
            }

            var card = new Card();
            card.Name = "test card";
            card.Description = "This is a test card";
            card.Attack = 1;
            card.Defense = 1;
            card.Cost = 0;
            card.CardRarity = 1;
            card.CardStyle = 1;
            card.CardType = 1;
            card.CardClub = 1;
            card.CardNation = 1;
            card.CardLeague = 1;
            data.Card.Add(card);
            data.SaveChanges();
        }

        public HttpResponseMessage Get()
        {
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }
    }
}