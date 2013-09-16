using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FooBarFootball.Models
{
    public class Red : Card
    {
        public Red()
        {
            Id = "1";
            Name = "Pep Guardiola";
            CardType = "Basic Tactic";
        }

        public override void Play(GameState gameState)
        {
            if (!IsTapped)
            {
                gameState.RedTactics++;
                IsTapped = true;
            }
        }
    }
}