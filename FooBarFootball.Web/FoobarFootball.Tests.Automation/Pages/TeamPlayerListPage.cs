using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoobarFootball.Tests.Automation.Pages
{
    public class TeamPlayerListPage
    {
        IWebDriver _driver;
        string url = "http://www.futhead.com/14/clubs/{0}/";

        public TeamPlayerListPage(IWebDriver driver, string teamName)
        {
            if (driver == null)
            {
                throw new ArgumentNullException("driver");
            }

            if (string.IsNullOrEmpty(teamName))
            {
                throw new ArgumentNullException("teamName");
            }

            _driver = driver;
            _driver.Navigate().GoToUrl(string.Format(url, teamName));
        }

        private IList<IWebElement> PlayerCardElements()
        {
            return _driver.FindElements(By.ClassName("playercard"));
        }

        public List<int> PlayerIds()
        {
            var ids = new List<int>();
            foreach(var player in PlayerCardElements())
            {
                try
                {
                    ids.Add(int.Parse(player.GetAttribute("data-player-id")));
                }
                catch (Exception)
                {
                }
            }
            
            return ids;
        }
    }
}
