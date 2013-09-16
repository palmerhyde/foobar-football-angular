using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FooBarFootball.Models
{
    public class White : Card
    {
        public White()
        {
            Id = "1";
            Name = "Alex Ferguson";
            CardType = "Basic Tactic";
        }

        public override void Play(GameState gameState)
        {
            if (!IsTapped)
            {
                gameState.WhiteTactics++;
                IsTapped = true;
            }
        }
    }
}