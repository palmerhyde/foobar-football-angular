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
        public HttpResponseMessage Get()
        {
            // TODO: Set up DI
            IPlayerRepository repo = new XmlPlayerRepository(BaseSiteUrl + "Data/players.xml");
            var cards = repo.Get();
            return Request.CreateResponse(HttpStatusCode.OK, cards);
        }

        // TODO: move to utility method somewhere.
        public static string BaseSiteUrl
        {
            get
            {
                HttpContext context = HttpContext.Current;
                string baseUrl = context.Request.Url.Scheme + "://" + context.Request.Url.Authority + context.Request.ApplicationPath.TrimEnd('/') + '/';
                return baseUrl;
            }
        }
    }
}