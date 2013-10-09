using FooBarFootball.Data.Implementations;
using FooBarFootball.Data.Interfaces;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace FooBarFootball.Web.Tests
{
    [TestClass]
    public class XmlPlayerRepositoryTests
    {
        [TestMethod]

        public void LoadPlayersFromXml()
        {
            IPlayerRepository repo = new XmlPlayerRepository("MockXml/players.xml");
            var cards = repo.Get();
            Assert.IsNotNull(cards);
            Assert.IsTrue(cards.Count > 0);
        }
    }
}