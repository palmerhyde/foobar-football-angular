using FooBarFootball.Data.Interfaces;
using FooBarFootball.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Xml;
using System.Xml.Serialization;

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
            
            // TODO: do not hard code this path. Breaks unit tests
            document.Load(playerEndPoint);
            string xml = document.InnerXml;
            List<PlayerCard> cards = Deserialize<List<PlayerCard>>(xml);
            return cards;
        }

        // TODO: Move this into an Xml helper class
        public static StringWriter Serialize(object o)
        {
            var xs = new XmlSerializer(o.GetType());
            var xml = new StringWriter();
            xs.Serialize(xml, o);

            return xml;
        }

        // TODO: Move this into an Xml helper class
        public static T Deserialize<T>(string xml)
        {
            var xs = new XmlSerializer(typeof(T));
            return (T)xs.Deserialize(new StringReader(xml));
        }
    }
}