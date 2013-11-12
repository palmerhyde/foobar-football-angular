using FooBarFootball.Data.Implementations;
using FooBarFootball.Data.Interfaces;
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
            container.RegisterType<IPlayerRepository>(new InjectionFactory((c) => new XmlPlayerRepository(BaseSiteUrl + "Data/players.xml")));
            container.RegisterType<IMoveRepository>(new InjectionFactory((c) => new XmlMoveRepository(BaseSiteUrl + "Data/moves.xml")));
            container.RegisterType<ITacticRepository>(new InjectionFactory((c) => new XmlTacticRepository(BaseSiteUrl + "Data/tactics.xml")));
            container.RegisterType<IPlayLogic, PlayLogic>();
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