using FooBarFootball.Models;
using FooBarFootball.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FooBarFootball.Web.Controllers
{
    public class ValuesController : ApiController
    {
        public HttpResponseMessage Get()
        {
            CardsViewModel vm = new CardsViewModel();
            vm.Cards = new List<Card>();
            return Request.CreateResponse(HttpStatusCode.OK, vm);
        }
    }
}