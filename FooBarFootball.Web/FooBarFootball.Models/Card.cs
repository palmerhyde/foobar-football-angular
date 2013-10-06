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
        public string Description { get; set; }
        public CardType CardType { get; set; }
        public string Rarity { get; set; }
        public string PictureUrl { get; set; }

        public int GenericCost { get; set; }
        public int OrganisedFootballCost { get; set; }
        public int CounterFootballCost { get; set; }
        public int TotalFootballCost { get; set; }
        public int LatinFootballCost { get; set; }
        public int PhysicalFootballCost { get; set; }

        public int ConvertedCost()
        {
            return GenericCost + OrganisedFootballCost + CounterFootballCost + TotalFootballCost + LatinFootballCost + PhysicalFootballCost;
        }
    }
}