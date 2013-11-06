using FooBarFootball.Data.Implementations;
using FooBarFootball.Data.Interfaces;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace FooBarFootball.Web.Controllers
{
    public class MovesController : BaseController
    {
        public HttpResponseMessage Get()
        {
            // TODO: Set up DI
            IMoveRepository repo = new XmlMoveRepository(BaseSiteUrl + "Data/moves.xml");
            var cards = repo.Get();
            return Request.CreateResponse(HttpStatusCode.OK, cards);
        }
    }
}