using System.Collections.Generic;

namespace FooBarFootball.Models
{
    public class PlayerCard : Card
    {
        public PlayerCard()
        {
            CardType = CardType.Player;
        }

        public int OverallRating { get; set; }
        public int AttackingRating { get; set; }
        public int CreativeRating { get; set; }
        public int DefensiveRating { get; set; }
        public string Club { get; set; }
        public string Nation { get; set; }
        public string League { get; set; }
        public PlayerPosition Position { get; set; }
        public List<PlayerAttributeValue> PlayerAttributes { get; set; }
        public List<PlayerAttributeValue> Strengths { get; set; }
        public List<PlayerAttributeValue> Weaknesses { get; set; }
        public string PlayerDataUrl { get; set; }
    }
}