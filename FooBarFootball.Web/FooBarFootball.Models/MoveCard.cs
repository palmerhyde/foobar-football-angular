using System.Collections.Generic;
namespace FooBarFootball.Models
{
    public class MoveCard : Card
    {
        public MoveCard()
        {
            CardType = CardType.Move;
        }

        public int Cost { get; set; }                     
    }
}