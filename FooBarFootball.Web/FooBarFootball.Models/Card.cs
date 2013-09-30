using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FooBarFootball.Models
{
    public abstract class Card
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string FlavourText { get; set; }
        public int GenericCost { get; set; }
        public int WhiteCost { get; set; }
        public int BlackCost { get; set; }
        public int RedCost { get; set; }
        public int BlueCost { get; set; }
        public int GreenCost { get; set; }
        public string CardType { get; set; }
        public string Rarity { get; set; }
        public bool IsTapped { get; set; }
        public int Attack { get; set; }
        public int Defence { get; set; }
        
        public void UnTap()
        {
            IsTapped = false;
        }

        public virtual void Play(GameState gameState)
        {
        }
    }
}