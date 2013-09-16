using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FooBarFootball.Models
{
    public class Blue : Card
    {
        public Blue()
        {
            Id = "1";
            Name = "Arsene Wenger";
            CardType = "Basic Tactic";
        }

        public override void Play(GameState gameState)
        {
            if (!IsTapped)
            {
                gameState.BlueTactics++;
                IsTapped = true;
            }
        }
    }
}