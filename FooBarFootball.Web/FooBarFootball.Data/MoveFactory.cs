using FooBarFootball.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FooBarFootball.Data
{
    public class PlayerFactory
    {
        public List<PlayerCard> LoadPlayers()
        {
            PlayerCardHelper helper = new PlayerCardHelper();
            List<PlayerCard> Players = new List<PlayerCard>();
            PlayerCard player1 = new PlayerCard();
            player1.Id = Guid.NewGuid().ToString();
            player1.Name = "Frank Lampard";
            player1.Position = PlayerPosition.Midfielder;
            player1.PlayerAttributes = helper.SetOutfieldPlayerAttributes(84, 60, 78, 85, 71, 69);
            Players.Add(player1);
            return Players;
        }
    }
}
