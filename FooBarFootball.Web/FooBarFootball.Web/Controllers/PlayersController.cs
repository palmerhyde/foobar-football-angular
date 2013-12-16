using FooBarFootball.Data.Implementations;
using FooBarFootball.Data.Interfaces;
using FooBarFootball.Models;
using FooBarFootball.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace FooBarFootball.Web.Controllers
{
    public class PlayersController : ApiController
    {
        private IPlayerRepository _playerRepo;

        public PlayersController(IPlayerRepository playerRepo)
        {
            _playerRepo = playerRepo;
        }

        public HttpResponseMessage Get()
        {
            var cards = _playerRepo.Get();

            List<Card> card = new List<Card>();
            card.AddRange(cards);
            return Request.CreateResponse(HttpStatusCode.OK, card);
        }
    }
}