using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using FooBarFootball.Models;
using System.Collections.Generic;
using System.Diagnostics;

namespace FooBarFootball.Web.Tests.Game
{
    [TestClass]
    public class GameTest
    {
        [TestMethod]
        public void BlueTap()
        {
            GameState state = new GameState();
            Blue blue = new Blue();
            blue.Play(state);
            Assert.IsTrue(state.BlueTactics == 1, "expected 1 blue tactics, actual {0} blue tactics", state.BlueTactics);
        }

        [TestMethod]
        public void RedTap()
        {
            GameState state = new GameState();
            Red red = new Red();
            red.Play(state);
            Assert.IsTrue(state.RedTactics == 1, "expected 1 red tactics, actual {0} red tactics", state.RedTactics);
        }

        [TestMethod]
        public void WhiteTap()
        {
            GameState state = new GameState();
            White white = new White();
            white.Play(state);
            Assert.IsTrue(state.WhiteTactics == 1, "expected 1 white tactics, actual {0} white tactics", state.WhiteTactics);
        }

        [TestMethod]
        public void BlackTap()
        {
            GameState state = new GameState();
            Black black = new Black();
            black.Play(state);
            Assert.IsTrue(state.BlackTactics == 1, "expected 1 black tactics, actual {0} black tactics", state.BlackTactics);
        }

        [TestMethod]
        public void GreenTap()
        {
            GameState state = new GameState();
            Green green = new Green();
            green.Play(state);
            Assert.IsTrue(state.GreenTactics == 1, "expected 1 green tactics, actual {0} green tactics", state.GreenTactics);
        }
    }
}
