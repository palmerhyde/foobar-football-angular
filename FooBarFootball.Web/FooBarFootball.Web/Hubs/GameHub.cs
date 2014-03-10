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
            // WE want to guard against a player whom is already in the waiting room joining the waiting room again.
            var team = GameState.Instance.GetTeamFromWaitingRoom(userId);
            
            if (team != null)
            {
                Clients.Caller.teamExists();
                return true;
            }

            // Now that we know the player does not exist in the waiting room, lets add them.
            team = GameState.Instance.AddTeamToWaitingRoom(userId);
            
            // Set connection variables to signalr can make callbacks
            team.ConnectionId = Context.ConnectionId;
            Clients.Caller.name = team.Name;
            Clients.Caller.hash = team.Hash;
            Clients.Caller.id = team.Id;
            
            // TODO: Only return a game object
            // This is a polite update, we don't actually need it.
            //Clients.Caller.playerJoined(player);

            return StartGame(team);
        }

        public bool PlayCard(int gameId, int cardId, int targetCardId)
        {
            return true;
        }

        private bool StartGame(Team you)
        {
            if (you != null)
            {
                Team opponent;

                // Outs are the sign of the devil re-incarnated. Get rid of them.
                var game = GameState.Instance.FindGame(you, out opponent);
                if (game != null)
                {
                    Clients.Group(you.Group).buildBoard(game);
                    return true;
                }

                opponent = GameState.Instance.GetNewOpponent(you);
                if (opponent == null)
                {
                    // No opponent was found in the waiting room. Player is in the waiting room
                    Clients.Caller.waitingList();
                    return true;
                }

                game = GameState.Instance.CreateGame(you, opponent);
                game.WhosTurnId = you.Id;
                Clients.Group(you.Group).buildBoard(game);
                return true;
            }
            
            return false;
        }
    }
}