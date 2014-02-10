using System.Collections.Generic;
namespace FooBarFootball.Models
{
    public class ManagerCard : Card
    {
        public ManagerCard()
        {
            CardType = CardType.Manager;
        }

        public int Cost { get; set; }                     
    }
}