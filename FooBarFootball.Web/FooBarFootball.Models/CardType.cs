using System.Collections.Generic;
namespace FooBarFootball.Models
{
    public class CardType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Card> Cards { get; set; }
    }
}