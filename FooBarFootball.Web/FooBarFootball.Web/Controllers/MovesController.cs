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
        private IMoveRepository _moveRepo;

        public MovesController(IMoveRepository moveRepo)
        {
            _moveRepo = moveRepo;
        }
        
        public HttpResponseMessage Get()
        {
            var cards = _moveRepo.Get();
            return Request.CreateResponse(HttpStatusCode.OK, cards);
        }
    }
}