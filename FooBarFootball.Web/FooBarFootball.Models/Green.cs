using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FooBarFootball.Models
{
    public class Green : Card
    {
        public Green()
        {
            Id = "1";
            Name = "Sam Allardyce";
            CardType = "Basic Tactic";
        }

        public override void Play(GameState gameState)
        {
            if (!IsTapped)
            {
                gameState.GreenTactics++;
                IsTapped = true;
            }
        }
    }
}