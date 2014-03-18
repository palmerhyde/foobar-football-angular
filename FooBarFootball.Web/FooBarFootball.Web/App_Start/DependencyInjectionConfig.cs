using Microsoft.Practices.Unity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FooBarFootball.Web.App_Start
{
    public sealed class DependencyInjectionConfig
    {
        public static void RegisterUnityContainer(System.Web.Http.HttpConfiguration httpConfiguration)
        {

            IUnityContainer container = new UnityContainer();
            httpConfiguration.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(container);
        }

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