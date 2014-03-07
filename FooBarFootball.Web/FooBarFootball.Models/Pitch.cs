using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FooBarFootball.Models
{
    public class Pitch
    {
        public Card HomeTeamGoalKeeper { get; set; }
        public List<Card> HomeTeamDefenders { get; set; }
        public List<Card> HomeTeamMidfielders { get; set; }
        public List<Card> HomeTeamAttackers { get; set; }
        public Card AwayTeamGoalKeeper { get; set; }
        public List<Card> AwayTeamDefenders { get; set; }
        public List<Card> AwayTeamMidfielders { get; set; }
        public List<Card> AwayTeamAttackers { get; set; }
    }
}
