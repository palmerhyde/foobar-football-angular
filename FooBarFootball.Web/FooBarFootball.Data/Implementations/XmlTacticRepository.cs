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
        
        public IList<TacticCard> Get()
        {
            XmlDocument document = new XmlDocument();
            document.Load(endpoint);
            string xml = document.InnerXml;
            List<TacticCard> cards = XmlHelper.Deserialize<List<TacticCard>>(xml);
            return cards;
        }

        public TacticCard Get(string id)
        {
            throw new System.NotImplementedException();
        }
    }
}