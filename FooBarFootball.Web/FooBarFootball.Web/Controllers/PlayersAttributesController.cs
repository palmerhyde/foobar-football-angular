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
    public class PlayersAttributesController : ApiController
    {

        public HttpResponseMessage Get()
        {
            var attributes = Enum.GetValues(typeof(PlayerAttribute))
                        .Cast<PlayerAttribute>()
                        .Select(v => v.ToString())
                        .ToList();
            return Request.CreateResponse(HttpStatusCode.OK, attributes);
        }
    }
}