using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FooBarFootball.Models
{
    public abstract class MatchState
    {
        public virtual void Turn(Game game)
        {
        }

        protected virtual void ChangeState(Game game, MatchState matchState)
        {
            game.ChangeState(matchState);
        }
    }

    public class Wait : MatchState
    {
        private static MatchState state = new Wait();

        private Wait()
        {
        }

        public static MatchState Instance()
        {
            return state;
        }

        public override void Turn(Game game)
        {
            // Do not change game state as we are waiting for user interaction
        }
    }

    public class KickOff : MatchState
    {
        private static MatchState state = new KickOff();

        private KickOff()
        {
        }

        public static MatchState Instance()
        {
            return state;
        }

        public override void Turn(Game game)
        {
            //ChangeState(game, KickOff.Instance());
        }
    }

    public class CreateGame : MatchState
    {
        private static MatchState state = new CreateGame();

        private CreateGame()
        {
        }

        public static MatchState Instance()
        {
            return state;
        }

        public override void Turn(Game game)
        {
            // Load home team data - where do we get the inital data from? We need a message type system that is parsed into the state constructor?
            // In this case we expect a team object representing the home team.


            // Set this state
            game.Id = 1;
            game.HomeTeam = new Team();
            game.AwayTeam = new Team();
            game.Pitch = new Pitch();
            game.History = new List<Card>();
            game.FixtureDate = DateTime.Now;
            
            ChangeState(game, Wait.Instance());
        }
    }
}