using FooBarFootball.Data.Implementations;
using FooBarFootball.Data.Interfaces;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace FooBarFootball.Web.Tests
{
    [TestClass]
    public class XmlRepositoryTests
    {
        [Ignore]
        [TestMethod]
        public void LoadMovesFromXml()
        {
            IMoveRepository repo = new XmlMoveRepository("MockXml/moves.xml");
            var cards = repo.Get();
            Assert.IsNotNull(cards);
            Assert.IsTrue(cards.Count > 0);
        }
    }
}