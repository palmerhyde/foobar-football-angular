using FooBarFootball.Data.Implementations;
using FooBarFootball.Data.Interfaces;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace FooBarFootball.Web.Controllers
{
    public class MovesController : ApiController
    {
        public HttpResponseMessage Get()
        {
            // TODO: Set up DI
            IMoveRepository repo = new XmlMoveRepository(BaseSiteUrl + "Data/moves.xml");
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