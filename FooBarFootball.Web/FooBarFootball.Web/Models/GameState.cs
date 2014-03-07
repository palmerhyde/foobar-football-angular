using FooBarFootball.Models;
using FooBarFootball.Web.Hubs;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace FooBarFootball.Web.Models
{
    public class GameState
    {
        private static readonly Lazy<GameState> _instance = new Lazy<GameState>(
            () => new GameState(GlobalHost.ConnectionManager.GetHubContext<GameHub>()));

        private readonly ConcurrentDictionary<string, Team> _teams =
            new ConcurrentDictionary<string, Team>(StringComparer.OrdinalIgnoreCase);

        private readonly ConcurrentDictionary<string, Game> _games =
            new ConcurrentDictionary<string, Game>(StringComparer.OrdinalIgnoreCase);

        public GameState(IHubContext context)
        {
            Clients = context.Clients;
            Groups = context.Groups;
        }

        public static GameState Instance
        {
            get { return _instance.Value; }
        }

        public IHubConnectionContext Clients { get; set; }
        public IGroupManager Groups { get; set; }

        // Move to state engine
        public Team GetTeam(string userName)
        {
            return _teams.Values.FirstOrDefault(u => u.Name == userName);

        }

        // Move to state engine
        public Team CreateTeam(string userName)
        {
            var team = new Team();
            team.Id = Random();
            team.Name = userName;
            team.Hash = GetMD5Hash(userName);
            _teams[userName] = team;
            return team;
        }

        // Move to state engine
        public Game FindGame(Team player, out Team opponent)
        {
            opponent = null;
            if (player.Group == null)
                return null;

            Game game;
            _games.TryGetValue(player.Group, out game);

            if (game != null)
            {
                if (player.Id == game.HomeTeam.Id)
                {
                    opponent = game.AwayTeam;
                    return game;
                }

                opponent = game.HomeTeam;
                return game;
            }
            return null;
        }

        public Team GetNewOpponent(Team team)
        {
            return _teams.Values.FirstOrDefault((u => !u.IsPlaying && u.Id != team.Id));
        }

        // Move to state engine
        public Game CreateGame(Team homeTeam, Team awayTeam)
        {
            var game = new Game()
            {
                HomeTeam = homeTeam,
                AwayTeam = awayTeam,
                Pitch = new Pitch()
            };

            var group = Guid.NewGuid().ToString("d");
            _games[group] = game;

            homeTeam.IsPlaying = true;
            homeTeam.Group = group;

            awayTeam.IsPlaying = true;
            awayTeam.Group = group;

            Groups.Add(homeTeam.ConnectionId, group);
            Groups.Add(awayTeam.ConnectionId, group);

            return game;
        }

        public void LeaveGame(Game game)
        {
        }

        // TODO: move to helper or extension of string
        private string GetMD5Hash(string userName)
        {
            return String.Join("", MD5.Create()
                         .ComputeHash(Encoding.Default.GetBytes(userName))
                         .Select(b => b.ToString("x2")));
        }

        // TODO: move to helper or extension of int
        private static int Random()
        {
            Random rand = new Random();
            return rand.Next(1, 100000);
        }
    }
}