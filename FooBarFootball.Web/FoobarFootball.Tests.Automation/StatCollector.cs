using FoobarFootball.Tests.Automation.Pages;
using FooBarFootball.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using System;
using System.Collections.Generic;
using System.IO;
using System.Xml;
using System.Xml.Serialization;

namespace FoobarFootball.Tests.Automation
{
    [TestClass]
    public class ImportPlayers
    {
        List<PlayerCard> cardsList = new List<PlayerCard>();
        FirefoxDriver browser = new FirefoxDriver();

        [Ignore]
        [TestMethod]
        public void GetPlayersById()
        {
            for (int i = 1; i <= 100; i++)
            {
                try 
                {
                    var playerProfilePage = new PlayerProfilePage(browser, i);
                    cardsList.Add(playerProfilePage.Card());
                }
                catch(Exception)
                {
                }
            }

            string xml = Serialize(cardsList).ToString();
            XmlDocument xdoc = new XmlDocument();
            xdoc.LoadXml(xml);
            xdoc.Save("playersfull.xml");
            browser.Close();
        }

        [Ignore]
        [TestMethod]
        public void GetPlayersByTeam()
        {
            List<string> teams = new List<string>();
            teams.Add("legends");
            
            try
            {
                foreach (var team in teams)
                {
                    var teamPage = new TeamPlayerListPage(browser, team);
                    foreach (var id in teamPage.PlayerIds())
                    {
                        var playerPage = new PlayerProfilePage(browser, id);
                        cardsList.Add(playerPage.Card());
                    }
                }
            }
            catch (Exception)
            {
            }
            
            string xml = Serialize(cardsList).ToString();
            XmlDocument xdoc = new XmlDocument();
            xdoc.LoadXml(xml);
            xdoc.Save("playersLegends.xml");
            browser.Close();
        }

        [Ignore]
        [TestMethod]
        public void GetPlayersByClub()
        {
            // Get list of teams
            browser.Navigate().GoToUrl("http://www.futhead.com/14/clubs/");
            var clubs = browser.FindElement(By.ClassName("club-table"));
            var clubLinks = clubs.FindElements(By.TagName("a"));

            List<string> hrefs = new List<string>();

            foreach (var a in clubLinks)
            {
                hrefs.Add(a.GetAttribute("href"));
            }
            
            string xml = Serialize(cardsList).ToString();
            XmlDocument xdoc = new XmlDocument();
            xdoc.LoadXml(xml);
            xdoc.Save("players2.xml");
            browser.Close();
        }

        public static StringWriter Serialize(object o)
        {
            var xs = new XmlSerializer(o.GetType());
            var xml = new StringWriter();
            xs.Serialize(xml, o);

            return xml;
        }
    }
}
