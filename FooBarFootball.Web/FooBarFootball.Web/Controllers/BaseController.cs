using System.Web;
using System.Web.Http;

namespace FooBarFootball.Web.Controllers
{
    public class BaseController : ApiController
    {
        public string BaseSiteUrl
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
