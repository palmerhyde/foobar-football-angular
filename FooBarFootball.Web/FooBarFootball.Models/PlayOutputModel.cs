namespace FooBarFootball.Models
{
    public class PlayOutputModel
    {
        public string Winner { get; set; }
        public int AttackingBaseValue { get; set ; }
        public int DefendingBaseValue { get; set; }
        public int TotalBaseValue { get; set; }
        public int ResultValue { get; set; }
        public PlayerCard AttackingPlayer { get; set; }
        public PlayerCard DefendingPlayer { get; set; }
        public MoveCard Move { get; set; }
    }
}
