using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FooBarFootball.Models
{
    public class GameState
    {
        public int WhiteTactics { get; set; }
        public int BlackTactics { get; set; }
        public int RedTactics { get; set; }
        public int BlueTactics { get; set; }
        public int GreenTactics { get; set; }
        public int Influence { get; set; }
        public IList<Card> Cards { get; set; }
    }
}
