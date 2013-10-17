using System.Collections.Generic;

namespace FooBarFootball.Models
{
    public class Game
    {
        public List<Card> Player1Deck { get; set; }
        public List<Card> Player2Deck { get; set; }
        public List<Card> Player1Hand { get; set; }
        public List<Card> Player2Hand { get; set; }
        public List<Card> Player1Pitch { get; set; }
        public List<Card> Player2Pitch { get; set; }
        public int Player1Impact { get; set; }
        public int Player2Impact { get; set; }
    }
}
