using FooBarFootball.Data.Helpers;
using FooBarFootball.Data.Interfaces;
using FooBarFootball.Models;
using System.Collections.Generic;
using System.Xml;

namespace FooBarFootball.Data.Implementations
{
    public class XmlMoveRepository : IMoveRepository
    {
        private string moveEndPoint;

        public XmlMoveRepository(string url)
        {
            moveEndPoint = url;
        }
        
        public IList<MoveCard> Get()
        {
            XmlDocument document = new XmlDocument();
            document.Load(moveEndPoint);
            string xml = document.InnerXml;
            List<MoveCard> cards = XmlHelper.Deserialize<List<MoveCard>>(xml);
            return cards;
        }

        public MoveCard Get(string id)
        {
            throw new System.NotImplementedException();
        }
    }
}