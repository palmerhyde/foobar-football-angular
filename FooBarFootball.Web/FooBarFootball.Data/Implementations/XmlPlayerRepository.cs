using FooBarFootball.Data.Helpers;
using FooBarFootball.Data.Interfaces;
using FooBarFootball.Models;
using System.Collections.Generic;
using System.Xml;

namespace FooBarFootball.Data.Implementations
{
    public class XmlPlayerRepository : IPlayerRepository
    {
        private string playerEndPoint;

        public XmlPlayerRepository(string url)
        {
            playerEndPoint = url;
        }
        
        public IList<PlayerCard> Get()
        {
            XmlDocument document = new XmlDocument();
            document.Load(playerEndPoint);
            string xml = document.InnerXml;
            List<PlayerCard> cards = XmlHelper.Deserialize<List<PlayerCard>>(xml);
            return cards;
        }
    }
}