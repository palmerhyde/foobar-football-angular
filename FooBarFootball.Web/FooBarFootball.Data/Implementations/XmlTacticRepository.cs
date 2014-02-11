using FooBarFootball.Data.Helpers;
using FooBarFootball.Data.Interfaces;
using FooBarFootball.Models;
using System.Collections.Generic;
using System.Xml;

namespace FooBarFootball.Data.Implementations
{
    public class XmlTacticRepository : ITacticRepository
    {
        private string endpoint;

        public XmlTacticRepository(string url)
        {
            endpoint = url;
        }
        
        public IList<Card> Get()
        {
            XmlDocument document = new XmlDocument();
            document.Load(endpoint);
            string xml = document.InnerXml;
            List<Card> cards = XmlHelper.Deserialize<List<Card>>(xml);
            return cards;
        }

        public Card Get(string id)
        {
            throw new System.NotImplementedException();
        }
    }
}