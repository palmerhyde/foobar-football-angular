using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FooBarFootball.Models
{
    public class Game
    {
        private MatchState state;

        public int Id { get; set; }
        public Team HomeTeam { get; set; }
        public Team AwayTeam { get; set; }
        public Pitch Pitch { get; set; }
        public List<Card> History { get; set; }
        public DateTime FixtureDate { get; set; }
        public int WhosTurnId { get; set; }
        public string Message { get; set; }

        /// <summary>
        /// Allows a Match to change from one state to another
        /// </summary>
        /// <param name="to">The Match state to change to</param>
        public void ChangeState(MatchState to)
        {
            state = to;
            state.Turn(this);
        }

        public MatchState CurrentState
        {
            get
            {
                return state;
            }
        }
    }
}
