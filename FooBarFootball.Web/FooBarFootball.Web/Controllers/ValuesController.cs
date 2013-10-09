using FooBarFootball.Models;
using FooBarFootball.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FooBarFootball.Web.Controllers
{
    public class ValuesController : ApiController
    {
        public HttpResponseMessage Get()
        {
            #region Cards
            var vm = new CardsViewModel();
            var card1 = new Card
                {
                    Id = "1",
                    Name = "Gary Cahill",
                    ShortName = "Cahill",
                    Rarity = "none",
                    Description =
                        "Gary James Cahill is an English footballer who plays as a centeral defender for Chelsea and the England national team.",
                    CardType = CardType.Player,
                    PictureUrl = "garycahill.jpg"
                };

            var card2 = new Card
                {
                    Id = "2",
                    Name = "John Terry",
                    ShortName = "Terry",
                    Rarity = "none",
                    Description =
                        "John Terry is an English footballer who plays as a centeral defender for Chelsea and the England national team.",
                    CardType = CardType.Player,
                    PictureUrl = "johnterry.jpg"
                };

            var card3 = new Card
                {
                    Id = "3",
                    Name = "José Mourinho",
                    ShortName = "Mourinho",
                    Rarity = "none",
                    Description = "José Mourinho, is a Portuguese football manager and former football player, who is the current manager of Chelsea.",
                    CardType = CardType.Manager,
                    PictureUrl = "josemourinho.jpg"
                };

            var card4 = new Card
            {
                Id = "4",
                Name = "Camp Nou",
                ShortName = "Camp Nou",
                Rarity = "none",
                Description = "Camp Nou is a football stadium in Barcelona, Catalonia, Spain, which has been the home of Futbol Club Barcelona since 1957.",
                CardType = CardType.Stadium,
                PictureUrl = "campnou.jpg"
            };

            var card5 = new Card
            {
                Id = "5",
                Name = "Physical Football",
                ShortName = "Physical Football",
                Rarity = "none",
                Description = "The no-nonsense physical style incorporates a lot of traditonal values that have been present in England since the emergence of football.",
                CardType = CardType.Tactic,
                PictureUrl = "physical.jpg"
            };

            var card6 = new Card
            {
                Id = "6",
                Name = "Long Ball",
                ShortName = "Long Ball",
                Rarity = "none",
                Description = "An attempt, often speculative, to distribute the ball a long distance down the field via a cross, without the intention to pass it to the feet of the receiving player.",
                CardType = CardType.Move,
                PictureUrl = "longball.jpg"
            };
            #endregion


            vm.Add(card1);
            vm.Add(card2);
            vm.Add(card3);
            vm.Add(card4);
            vm.Add(card5);
            vm.Add(card6);
            return Request.CreateResponse(HttpStatusCode.OK, vm);
        }
    }
}