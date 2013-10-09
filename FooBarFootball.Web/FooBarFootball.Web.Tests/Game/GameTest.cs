using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using FooBarFootball.Models;
using System.Collections.Generic;
using System.Diagnostics;
using FooBarFootball.Data;

namespace FooBarFootball.Web.Tests.Game
{
    [TestClass]
    public class GameTest
    {
        [TestMethod]
        public void LoadPlayerCards()
        {
            PlayerFactory players = new PlayerFactory();
            var loadedPlayers = players.LoadPlayers();
            Assert.IsTrue(loadedPlayers.Count == 2);
        }
    }
}
