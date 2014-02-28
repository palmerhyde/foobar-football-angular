namespace FooBarFootball.Models
{
    /// <summary>
    /// A Card.
    /// </summary>
    public class Card
    {
        /// <summary>
        /// Gets or sets the id.
        /// </summary>
        /// <value>
        /// The id.
        /// </value>
        public string Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string Description { get; set; }
        public int CardType { get; set; }
        public CardType CardTypeModel { get; set; }
        //public CardStyle CardStyle { get; set; }
        //public CardRarity CardRarity { get; set; }
        public string PictureUrl { get; set; }
        public string VideoUrl { get; set; }
        public int Cost { get; set; }
        public int Attack { get; set; }
        public int Defense { get; set; }
        //public string Club { get; set; }
        //public string Nation { get; set; }
        //public string League { get; set; }
        //public PlayerPosition Position { get; set; }
    }
}