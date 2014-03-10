using FooBarFootball.Models;
using FooBarFootball.Web.Hubs;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
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
        public Team GetTeamFromWaitingRoom(string userName)
        {
            var team = _games.Values.FirstOrDefault(x => x.HomeTeam.Name == userName || x.AwayTeam.Name == userName);
            return _teams.Values.FirstOrDefault(u => u.Name == userName);
        }

        // Move to own state state engine
        public Team AddTeamToWaitingRoom(string userName)
        {
            // TODO: load team and deck from data source
            var team = new Team();
            
            // TODO: team id will be an int
            team.Id = Random();
            team.Name = userName;
            team.Hash = GetMD5Hash(userName);
            team.Deck = new List<Card>();
            _teams[userName] = team;
            return team;
        }

        // TODO: Move to own state in state engine
        public Game PlayCardFromHandToPitch()
        {
            return null;
        }

        // TODO: Move to own state in state engine
        public Game PlayCardOnPitch(int gameId, int cardId, int targetCardId)
        {
            // TODO: Get game from repo
            var game = _games.Values.FirstOrDefault(x => x.Id == gameId);

            // TODO: Get whose turn it is
            Team attackingTeam;
            Team defendingTeam;
            if (game.HomeTeam.Id == game.WhosTurnId)
            {
                attackingTeam = game.HomeTeam;
                defendingTeam = game.AwayTeam;
            }
            else
            {
                attackingTeam = game.AwayTeam;
                defendingTeam = game.HomeTeam;
            }

            // TODO: Get attacking card from game
            var card = attackingTeam.Pitch.FirstOrDefault(x => int.Parse(x.Id) == cardId);

            // TODO: Verify that this card is legal to play

            // TODO: Check that there is a target card otherwise direct damage
            
            // TODO: Get defending card from came
            var targetCard = defendingTeam.Pitch.FirstOrDefault(x => int.Parse(x.Id) == targetCardId);

            // TODO: Play the card (vanilla)
            targetCard.Defense = targetCard.Defense - card.Attack;
            card.Defense = card.Defense - targetCard.Attack;

            // TODO: Play cards abilities

            if (card.Defense <=0)
            {
                attackingTeam.Pitch.Remove(card);
                attackingTeam.DiscardPile.Add(card);
            }

            if (targetCard.Defense <=0)
            {
                defendingTeam.Pitch.Remove(card);
                defendingTeam.DiscardPile.Add(card);
            }

            // TOTO: Return the Game
            return game;
        }

        // Move to state engine
        // This method is fugly. Can you say out?
        public Game FindGame(Team you, out Team opponent)
        {
            opponent = null;

            // Ensure you belong to a broadcast group
            if (you.Group == null)
            {
                return null;
            }

            Game game;
            _games.TryGetValue(you.Group, out game);

            if (game != null)
            {
                if (you.Id == game.HomeTeam.Id)
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

            homeTeam.Deck = new List<Card>();
            homeTeam.Hand = new List<Card>();
            homeTeam.Pitch = new List<Card>();
            homeTeam.DiscardPile = new List<Card>();
            homeTeam.IsPlaying = true;
            homeTeam.Group = group;

            awayTeam.Deck = new List<Card>();
            awayTeam.Hand = new List<Card>();
            awayTeam.Pitch = new List<Card>();
            awayTeam.DiscardPile = new List<Card>();
            awayTeam.IsPlaying = true;
            awayTeam.Group = group;

            // shuffle home and away decks
            homeTeam.Deck = GetDeck(1);
            awayTeam.Deck = GetDeck(1);

            // draw 3 cards for home team
            // draw 4 cards for away team

            Groups.Add(homeTeam.ConnectionId, group);
            Groups.Add(awayTeam.ConnectionId, group);

            return game;
        }

        public void LeaveGame(Game game)
        {
        }

        private List<Card> GetDeck(int deckId)
        {
            // TODO: get the actual list of cards
            List<Card> cards = new List<Card>();
            var card1 = new Card();
            card1.Id = "1";
            card1.Name = "Liam Molloy";
            card1.CardTypeModel = new CardType() { Id = 1, Name = "Player" };
            card1.Cost = 1;
            card1.Attack = 1;
            card1.Defense = 1;
            card1.Description = "Foo Bar!";
            cards.Add(card1);

            var card2 = new Card();
            card2.Id = "2";
            card2.Name = "Frank Lampard";
            card2.CardTypeModel = new CardType() { Id = 1, Name = "Player" };
            card2.Cost = 7;
            card2.Attack = 7;
            card2.Defense = 4;
            card2.Description = "Foo Bar!";
            cards.Add(card2);
            return cards;
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