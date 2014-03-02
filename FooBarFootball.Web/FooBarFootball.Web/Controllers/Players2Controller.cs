using FooBarFootball.Data;
using FooBarFootball.Data.Implementations;
using FooBarFootball.Data.Interfaces;
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
    public class Players2Controller : ApiController
    {
        private IPlayer2Repository _playerRepo;

        public Players2Controller(IPlayer2Repository playerRepo)
        {
            _playerRepo = playerRepo;
        }

        public HttpResponseMessage Get()
        {
            var cards = _playerRepo.Get();

            
            var dto = cards.Select(x => new
            {
                x.Id,
                x.Name,
                x.Attack,
                x.Defense,
                x.Description,
                x.Cost,
                x.PictureUrl,
                CardType = new
                {
                    x.CardType1.Id,
                    x.CardType1.Name
                },
                Position = new
                {
                    x.CardPosition1.Id,
                    x.CardPosition1.Name
                }
            });

            return Request.CreateResponse(HttpStatusCode.OK, dto);
        }
    }
}