using FooBarFootball.Data.Implementations;
using FooBarFootball.Data.Interfaces;
using FooBarFootball.Models;
using FooBarFootball.Web.Models;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;

namespace FooBarFootball.Web.Controllers
{
    public class PlayController : BaseController
    {
        public HttpResponseMessage Get(GetPlayResponseViewModel viewModel)
        {
            // TODO: validate requests view model
            
            // TODO: Set up DI
            IPlayerRepository playerRepo = new XmlPlayerRepository(BaseSiteUrl + "Data/players.xml");
            IMoveRepository moveRepo = new XmlMoveRepository(BaseSiteUrl + "Data/moves.xml");

            var input = new PlayInputModel();
            input.AttackingPlayer = playerRepo.Get(viewModel.AttackingPlayerId);
            input.DefendingPlayer = playerRepo.Get(viewModel.DefendingPlayerId);
            input.Move = moveRepo.Get(viewModel.MoveId);

            IPlayLogic playLogic = new PlayLogic();
            var responseViewModel = playLogic.Play(input);
            
            return Request.CreateResponse(HttpStatusCode.OK, responseViewModel);
        }
    }
}