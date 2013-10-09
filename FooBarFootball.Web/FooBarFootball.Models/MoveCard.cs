using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FooBarFootball.Models
{
    public class MoveCard : Card
    {
        public MoveCard()
        {
            CardType = CardType.Move;
        }

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
        
        public PlayerAttribute AttackingAttribute { get; set; }
        public PlayerAttribute DefendingAttribute { get; set; }                           
    }
}
