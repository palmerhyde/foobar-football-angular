using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace FooBarFootball.Data.Helpers
{
    public static class XmlHelper
    {
        public static StringWriter Serialize(object o)
        {
            var xs = new XmlSerializer(o.GetType());
            var xml = new StringWriter();
            xs.Serialize(xml, o);

            return xml;
        }

        public static T Deserialize<T>(string xml)
        {
            var xs = new XmlSerializer(typeof(T));
            return (T)xs.Deserialize(new StringReader(xml));
        }
    }
}