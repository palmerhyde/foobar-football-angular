using FooBarFootball.Data.Implementations;
using FooBarFootball.Data.Interfaces;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace FooBarFootball.Web.Controllers
{
    public class ManagersController : ApiController
    {
        private IManagerRepository _managerRepo;

        public ManagersController(IManagerRepository managerRepo)
        {
            _managerRepo = managerRepo;
        }
        
        public HttpResponseMessage Get()
        {
            var cards = _managerRepo.Get();
            return Request.CreateResponse(HttpStatusCode.OK, cards);
        }
    }
}