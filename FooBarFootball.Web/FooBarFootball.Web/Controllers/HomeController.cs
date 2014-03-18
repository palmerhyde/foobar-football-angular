using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FooBarFootball.Web.Controllers
{
    // TODO: Refactor out. This should not require ASP.NET MVC
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
