using FooBarFootball.Data.Interfaces;
using FooBarFootball.Models;
using System;

namespace FooBarFootball.Data.Implementations
{
    public class PlayLogic : IPlayLogic
    {
        public PlayOutputModel Play(PlayInputModel input)
        {
            ParameterGuard(input);

            var attackingValue = ExtractAttributeValue(input.Move.AttackingAttribute, input.AttackingPlayer);
            var defendingValue = ExtractAttributeValue(input.Move.DefendingAttribute, input.DefendingPlayer);
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

        private int ExtractAttributeValue(PlayerAttribute attribute, PlayerCard player)
        {
            foreach(var a in player.PlayerAttributes)
            {
                if (a.Attribute == attribute)
                {
                    return a.Value;
                }
            }

            return 0;
        }

        private static Random RandomSeed()
        {
            return new Random();
        }
    }
}