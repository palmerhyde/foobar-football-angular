using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using FooBarFootball.Data.Implementations;
using FooBarFootball.Models;
using System.Collections.Generic;

namespace FooBarFootball.Web.Tests
{
    [TestClass]
    public class PlayLogicTests
    {
        [TestMethod]
        public void Play_NullInput_ThrowsException()
        {
            try
            {
                var logic = new PlayLogic();
                logic.Play(null);
                Assert.Fail("Expected Argument null exception to be thrown");
            }
            catch (ArgumentNullException ex)
            {
                Assert.IsTrue(ex.ParamName == "input");
            }
        }

        [TestMethod]
        public void Play_NullAttackingPlayer_ThrowsException()
        {
            try
            {
                var input = new PlayInputModel();
                input.DefendingPlayer = new PlayerCard();
                input.Move = new MoveCard();
                var logic = new PlayLogic();
                logic.Play(input);
                Assert.Fail("Expected Argument null exception to be thrown");
            }
            catch (ArgumentNullException ex)
            {
                Assert.IsTrue(ex.ParamName == "input.AttackingPlayer");
            }
        }

        [TestMethod]
        public void Play_NullDefendingPlayer_ThrowsException()
        {
            try
            {
                var input = new PlayInputModel();
                input.AttackingPlayer = new PlayerCard();
                input.Move = new MoveCard();
                var logic = new PlayLogic();
                logic.Play(input);
                Assert.Fail("Expected Argument null exception to be thrown");
            }
            catch (ArgumentNullException ex)
            {
                Assert.IsTrue(ex.ParamName == "input.DefendingPlayer");
            }
        }

        [TestMethod]
        public void Play_NullMove_ThrowsException()
        {
            try
            {
                var input = new PlayInputModel();
                input.AttackingPlayer = new PlayerCard();
                input.DefendingPlayer = new PlayerCard();
                var logic = new PlayLogic();
                logic.Play(input);
                Assert.Fail("Expected Argument null exception to be thrown");
            }
            catch (ArgumentNullException ex)
            {
                Assert.IsTrue(ex.ParamName == "input.Move");
            }
        }

        [TestMethod]
        public void Play_ValidInput_ReturnsOutput()
        {
            var input = new PlayInputModel();
            input.AttackingPlayer = new PlayerCard();
            input.AttackingPlayer.PlayerAttributes = new List<PlayerAttributeValue>();
            input.AttackingPlayer.PlayerAttributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Passing, Value = 25 });
            input.AttackingPlayer.PlayerAttributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Shooting, Value = 99 });
            input.DefendingPlayer = new PlayerCard();
            input.DefendingPlayer.PlayerAttributes = new List<PlayerAttributeValue>();
            input.DefendingPlayer.PlayerAttributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Marking, Value = 50 });
            input.DefendingPlayer.PlayerAttributes.Add(new PlayerAttributeValue() { Attribute = PlayerAttribute.Defending, Value = 99 });
            input.Move = new MoveCard();
            input.Move.AttackingAttribute = PlayerAttribute.Passing;
            input.Move.DefendingAttribute = PlayerAttribute.Defending;
            var logic = new PlayLogic();
            var output = logic.Play(input);
            Assert.IsNotNull(output, "Output cannot be null");
        }
    }
}
