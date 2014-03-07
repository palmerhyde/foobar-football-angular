using FooBarFootball.Models;
using FooBarFootball.Web.Models;
using Microsoft.AspNet.SignalR;
using System.Threading;

namespace FooBarFootball.Web.Hubs
{
    public class GameHub : Hub
    {
        public bool Join(string userId)
        {
            var player = GameState.Instance.GetTeam(userId);
            if (player != null)
            {
                Clients.Caller.teamExists();
                return true;
            }

            player = GameState.Instance.CreateTeam(userId);
            player.ConnectionId = Context.ConnectionId;
            Clients.Caller.name = player.Name;
            Clients.Caller.hash = player.Hash;
            Clients.Caller.id = player.Id;
            Clients.Caller.playerJoined(player);

            return StartGame(player);
        }

        private bool StartGame(Team homeTeam)
        {
            if (homeTeam != null)
            {
                Team awayTeam;
                var game = GameState.Instance.FindGame(homeTeam, out awayTeam);
                if (game != null)
                {
                    Clients.Group(homeTeam.Group).buildBoard(game);
                    return true;
                }

                awayTeam = GameState.Instance.GetNewOpponent(homeTeam);
                if (awayTeam == null)
                {
                    Clients.Caller.waitingList();
                    return true;
                }

                game = GameState.Instance.CreateGame(homeTeam, awayTeam);
                game.WhosTurn = homeTeam.Id;

                Clients.Group(homeTeam.Group).buildBoard(game);
                return true;
            }
            return false;
        }
    }
}