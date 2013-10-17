namespace FooBarFootball.Models
{
    public class PlayInputModel
    {
        public PlayerCard AttackingPlayer { get; set; }
        public PlayerCard DefendingPlayer { get; set; }
        public MoveCard Move { get; set; }
    }
}