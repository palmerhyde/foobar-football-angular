using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FooBarFootball.Models
{
    public class GaryCahill : Card
    {
        public GaryCahill()
        {
            Id = Guid.NewGuid().ToString();
            Name = "Gary Cahill";
            CardType = "Player - Centre Back";
            BlackCost = 2;
            Attack = 1;
            Defence = 3;
        }

        public override void Play(GameState gameState)
        {
            if (!IsTapped && gameState.BlackTactics >= BlackCost)
            {
                IsTapped = true;
            }
        }
    }
}
