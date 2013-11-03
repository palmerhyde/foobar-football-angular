namespace FooBarFootball.Models
{
    public class MoveCard : Card
    {
        public MoveCard()
        {
            CardType = CardType.Move;
        }

        public int GameClockModifier { get; set; }
        public int StaminaModifier { get; set; }
        public int ImpactPoints { get; set; }
        public int GenericCost { get; set; }
        public int OrganisedFootballCost { get; set; }
        public int CounterFootballCost { get; set; }
        public int TotalFootballCost { get; set; }
        public int LatinFootballCost { get; set; }
        public int PhysicalFootballCost { get; set; }

        public int ConvertedCost()
        {
            return GenericCost + OrganisedFootballCost + CounterFootballCost + TotalFootballCost + LatinFootballCost + PhysicalFootballCost;
        }

        public string AttackingSuccessCommentry { get; set; }
        public string DefendingSuccessCommentry { get; set; }
        public PlayerPosition AttackingPosition { get; set; }
        public PlayerPosition DefendingPosition { get; set; }
        // TODO: Add the ability to support multiple attributes
        public PlayerAttribute AttackingAttribute { get; set; }
        public PlayerAttribute DefendingAttribute { get; set; }                           
    }
}