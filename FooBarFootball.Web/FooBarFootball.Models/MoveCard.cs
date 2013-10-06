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
        
        public PlayerAttribute AttackingAttribute { get; set; }
        public PlayerAttribute DefendingAttribute { get; set; }                           
    }
}
