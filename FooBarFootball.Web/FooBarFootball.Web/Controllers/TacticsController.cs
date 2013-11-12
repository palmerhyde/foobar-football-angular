using FooBarFootball.Data.Implementations;
using FooBarFootball.Data.Interfaces;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FooBarFootball.Web.Controllers
{
    public class TacticsController : ApiController
    {
        private ITacticRepository _tacticRepo;

        public TacticsController(ITacticRepository tacticRepo)
        {
            _tacticRepo = tacticRepo;
        }

        public HttpResponseMessage Get()
        {
            var cards = _tacticRepo.Get();
            return Request.CreateResponse(HttpStatusCode.OK, cards);
        }
    }
}