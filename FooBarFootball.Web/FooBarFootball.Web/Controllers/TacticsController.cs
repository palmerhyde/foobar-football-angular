using FooBarFootball.Data.Implementations;
using FooBarFootball.Data.Interfaces;
using System.Net;
using System.Net.Http;

namespace FooBarFootball.Web.Controllers
{
    public class TacticsController : BaseController
    {
        public HttpResponseMessage Get()
        {
            // TODO: Set up DI
            ITacticRepository repo = new XmlTacticRepository(BaseSiteUrl + "Data/tactics.xml");
            var cards = repo.Get();
            return Request.CreateResponse(HttpStatusCode.OK, cards);
        }
    }
}