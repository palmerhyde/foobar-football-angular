using System.Collections.Generic;

namespace FooBarFootball.Models
{
    public class PlayerCard2 : Card
    {
        public PlayerCard2()
        {
            CardType = CardType.Player;
            CardStyle = CardStyle.Generic;
        }

        public int Cost { get; set; }
        public int Attack { get; set; }
        public int Stamina{ get; set; }
        public string Club { get; set; }
        public string Nation { get; set; }
        public string League { get; set; }
        public PlayerPosition Position { get; set; }
        public List<PlayerEffects> Effects { get; set; }
        public string PlayerDataUrl { get; set; }
    }
}