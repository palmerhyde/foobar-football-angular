using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FooBarFootball.Models
{
    public class TacticCard : Card
    {
        public TacticCard()
        {
            CardType = CardType.Tactic;
        }
        
        public int OrganisedFootballValue;
        public int TotalFootballValue;
        public int CounterFootballValue;
        public int LatinFootballValue;
        public int PhysicalFootballValue;
    }
}
