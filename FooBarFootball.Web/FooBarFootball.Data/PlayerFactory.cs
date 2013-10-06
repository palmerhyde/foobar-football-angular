using FooBarFootball.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FooBarFootball.Data
{
    public class MoveFactory
    {
        public List<MoveCard> LoadMoves()
        {
            List<MoveCard> moves = new List<MoveCard>();
            MoveCard move1 = new MoveCard();
            move1.Id = Guid.NewGuid().ToString();
            move1.Name = "Short pass from defence";
            move1.AttackingAttribute = new PlayerAttribute();
            move1.AttackingAttribute = PlayerAttribute.Passing;
            move1.DefendingAttribute = new PlayerAttribute();
            move1.DefendingAttribute = PlayerAttribute.Defending;
            return moves;
        }
    }
}
