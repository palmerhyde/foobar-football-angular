using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using FooBarFootball.Models;

namespace FooBarFootball.Web.Tests
{
    [TestClass]
    public class MatchStateTests
    {
        [TestMethod]
        public void CreateGameTest()
        {
            // game states 
            // wait
            // Create Game
            // Join game
            // Start Game
            // Home team select hand
            // Away team select hand
            // Mulligan
            // Tunnel
            // Start turn
            // Add goalkeeper to pitch
            // Add defender to pitch
            // Add midfielder to pitch
            // Add attacker to pitch
            // Play goalkeeper
            // Play defender
            // Play midfielder
            // Play attacker
            // Play move
            // Play manager
            // End turn
            // Final whistle
            // Finish
            
            Game game = new Game();
            game.ChangeState(CreateGame.Instance());
            Assert.IsInstanceOfType(game.CurrentState, typeof(Wait));
            game.ChangeState(KickOff.Instance());
            Assert.IsInstanceOfType(game.CurrentState, typeof(KickOff));
        }
    }
}
