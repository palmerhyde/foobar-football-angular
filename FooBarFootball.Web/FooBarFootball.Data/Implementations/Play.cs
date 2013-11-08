using FooBarFootball.Data.Interfaces;
using FooBarFootball.Models;
using System;
using System.Collections.Generic;

namespace FooBarFootball.Data.Implementations
{
    public class PlayLogic : IPlayLogic
    {
        public PlayOutputModel Play(PlayInputModel input)
        {
            ParameterGuard(input);

            var attackingValue = ExtractAttributeValues(input.Move.AttackingAttributes, input.AttackingPlayer);
            var defendingValue = ExtractAttributeValues(input.Move.DefendingAttributes, input.DefendingPlayer);
            var max = attackingValue + defendingValue;
            var result = RandomSeed().Next(0, max);
            var output = new PlayOutputModel();

            if (result <= attackingValue)
            {
                output.Winner = "Attacker";
            }
            else
            {
                output.Winner = "Defender";
            }

            output.AttackingBaseValue = attackingValue;
            output.DefendingBaseValue = defendingValue;
            output.TotalBaseValue = max;
            output.ResultValue = result;
            output.AttackingPlayer = input.AttackingPlayer;
            output.DefendingPlayer = input.DefendingPlayer;
            output.Move = input.Move;

            return output;
        }

        private void ParameterGuard(PlayInputModel input)
        {
            if (input == null)
            {
                throw new ArgumentNullException("input");
            }

            if (input.AttackingPlayer == null)
            {
                throw new ArgumentNullException("input.AttackingPlayer");
            }

            if (input.DefendingPlayer == null)
            {
                throw new ArgumentNullException("input.DefendingPlayer");
            }

            if (input.Move == null)
            {
                throw new ArgumentNullException("input.Move");
            }
        }

        private int ExtractAttributeValues(List<PlayerAttribute> attributes, PlayerCard player)
        {
            int value = 0;
            
            foreach(var a in player.PlayerAttributes)
            {
                if (attributes.Contains(a.Attribute))
                {
                    value = value + a.Value;
                }
            }

            return value;
        }

        private static Random RandomSeed()
        {
            return new Random();
        }
    }
}