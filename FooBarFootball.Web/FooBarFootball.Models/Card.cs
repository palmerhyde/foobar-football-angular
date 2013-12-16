using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FooBarFootball.Models
{
    public abstract class Card
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string Description { get; set; }
        public CardType CardType { get; set; }
        public CardStyle CardStyle { get; set; }
        public string Rarity { get; set; }
        public string PictureUrl { get; set; }
        public string VideoUrl { get; set; }
    }
}