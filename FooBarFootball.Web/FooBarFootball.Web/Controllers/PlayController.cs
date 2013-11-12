using FooBarFootball.Data.Implementations;
using FooBarFootball.Data.Interfaces;
using FooBarFootball.Models;
using FooBarFootball.Web.Models;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FooBarFootball.Web.Controllers
{
    public class PlayController : ApiController
    {
        private IPlayLogic _logic;
        private IPlayerRepository _playerRepo;
        private IMoveRepository _moveRepo;

        public PlayController(IPlayLogic logic, IPlayerRepository playerRepo, IMoveRepository moveRepo)
        {
            _logic = logic;
            _playerRepo = playerRepo;
            _moveRepo = moveRepo;
        }

        public HttpResponseMessage Get([FromUri] GetPlayResponseViewModel viewModel)
        {
            var input = new PlayInputModel();
            input.AttackingPlayer = _playerRepo.Get(viewModel.AttackingPlayerId);
            input.DefendingPlayer = _playerRepo.Get(viewModel.DefendingPlayerId);
            input.Move = _moveRepo.Get(viewModel.MoveId);

            IPlayLogic playLogic = new PlayLogic();
            var responseViewModel = _logic.Play(input);
            
            return Request.CreateResponse(HttpStatusCode.OK, responseViewModel);
        }
    }
}