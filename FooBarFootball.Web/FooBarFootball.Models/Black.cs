using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FooBarFootball.Models
{
    public class Black : Card
    {
        public Black()
        {
            Id = "1";
            Name = "Jose Mourinho";
            CardType = "Basic Tactic";
        }

        public override void Play(GameState gameState)
        {
            if (!IsTapped)
            {
                gameState.BlackTactics++;
                IsTapped = true;
            }
        }
    }
}