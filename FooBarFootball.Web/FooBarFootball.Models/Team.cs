using System.Collections.Generic;

namespace FooBarFootball.Models
{
    public class Team
    {
        public int Id { get; set; }
        public string Hash { get; set; }
        public string Name { get; set; }
        public string ConnectionId { get; set; }
        public List<Card> Hand { get; set; }
        public List<Card> Deck { get; set; }
        public List<Card> Pitch { get; set; }
        public List<Card> DiscardPile { get; set; }
        public string Group { get; set; }
        public bool IsPlaying { get; set; }
        public List<int> Matches { get; set; }
    }
}