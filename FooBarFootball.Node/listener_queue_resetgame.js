var listen = function () {
    console.log('Queue: Reset Game');
    
    var ServiceFirebase = require('./service_firebase');
    var Firebase = require('firebase');
    var Q = require('q');
    var _ = require('underscore');
    
    var queueRef = new Firebase('https://foobarfootball.firebaseio.com/Queues/ResetGame');
    queueRef.on('child_added', function (snapshot) {
        var gameId = snapshot.val().GameId;

        // TODO: get the real game
        var gamePromise = ServiceFirebase.Find("Games", "test");
        var all = Q.all([gamePromise]);

        all.then(function() {
            var game = gamePromise.valueOf();
            var resetGame = {
            "Id": "152879",
            "WhosTurnIsIt" : "0",
            "State" : "Playing",
            "HomeTeam": 
          {
              "UserId": "0",
              "TeamName": "Palmer Hyde FC",
              "Mana": "2",
              "Score": "0",
                  "Deck" : [
              {
                "Id": "186200",
                "Name": "Fabio Borini",
                "ShortName": "Borini",
                "CardType": "Player",
                "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/186200.png",
                "Cost": "1",
                "Attack": "2",
                "Stamina": "1",
                "Club": "http://fh13.fhcdn.com/static/img/14/clubs/106.png",
                "Nation": "http://fh13.fhcdn.com/static/img/nations/27.png",
                "Position": "Attacker",
                "PlayerDataUrl": "http://www.futhead.com/14/players/186200/",
                "Hearthstone" : "Murloc Raider"
              },
              {
                "Id": "192505",
                "Name": "Romelu Lukaku",
                "ShortName": "Lukaku",
                "CardType": "Player",
                "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/192505.png",
                "Cost": "2",
                "Attack": "3",
                "Stamina": "2",
                "Club": "http://fh13.fhcdn.com/static/img/14/clubs/7.png",
                "Nation": "http://fh13.fhcdn.com/static/img/nations/7.png",
                "Position": "Attacker",
                "PlayerDataUrl": "http://www.futhead.com/14/players/192505/",
                "Hearthstone" : "Bloodfen Raptor"
              },
              {
                "Id": "180819",
                "Name": "Adam Lallana",
                "ShortName": "Hernández",
                "CardType": "Player",
                "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/180819.png",
                "Cost": "2",
                "Attack": "1",
                "Stamina": "1",
                "Description": "Manager instructions: Draw a card",
                "Club": "http://fh13.fhcdn.com/static/img/14/clubs/17.png",
                "Nation": "http://fh13.fhcdn.com/static/img/nations/14.png",
                "Position": "Midfielder",
                "PlayerDataUrl": "http://www.futhead.com/14/players/180819/",
                "Hearthstone" : "Novice Engineer"
              },
              {
                "Id": "169596",
                "Name": "Ryan Shawcross",
                "ShortName": "Shawcross",
                "CardType": "Player",
                "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/169596.png",
                "Cost": "2",
                "Attack": "2",
                "Stamina": "3",
                "Club": "http://fh13.fhcdn.com/static/img/14/clubs/1806.png",
                "Nation": "http://fh13.fhcdn.com/static/img/nations/14.png",
                "Position": "Defender",
                "PlayerDataUrl": "http://www.futhead.com/14/players/169596/",
                "Hearthstone": "River Crocolisk"
              },
              {
                "Id": "164477",
                "Name": "John Obi Mikel",
                "ShortName": "Mikel",
                "CardType": "Player",
                "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/164477.png",
                "Cost": "3",
                "Attack": "2",
                "Stamina": "2",
                "Description": "Defensive cover, all other players on the pitch have +1 attack",
                "Club": "http://fh13.fhcdn.com/static/img/14/clubs/5.png",
                "Nation": "http://fh13.fhcdn.com/static/img/nations/133.png",
                "Position": "Midfielder",
                "PlayerDataUrl": "http://www.futhead.com/14/players/164477/",
                "Hearthstone": "Raid leader"
              },
              {
                "Id": "8473",
                "Name": "Tomáš Rosický",
                "ShortName": "Rosický",
                "CardType": "Player",
                "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/8473.png",
                "Cost": "3",
                "Attack": "3",
                "Stamina": "1",
                "Description": "Pressure",
                "Club": "http://fh13.fhcdn.com/static/img/14/clubs/1.png",
                "Nation": "http://fh13.fhcdn.com/static/img/nations/12.png",
                "Position": "Midfielder",
                "PlayerDataUrl": "http://www.futhead.com/14/players/8473/",
                "Hearthstone": "Wolfrider"
              },
              {
                "Id": "53914",
                "Name": "Phil Jagielka",
                "ShortName": "Jagielka",
                "CardType": "Player",
                "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/53914.png",
                "Cost": "4",
                "Attack": "2",
                "Stamina": "7",
                "Club": "http://fh13.fhcdn.com/static/img/14/clubs/7.png",
                "Nation": "http://fh13.fhcdn.com/static/img/nations/14.png",
                "Position": "Defender",
                "PlayerDataUrl": "http://www.futhead.com/14/players/53914/",
                "Hearthstone": "Oasis Snapjaw"
              },
              {
                "Id": "46815",
                "Name": "Brede Hangeland",
                "ShortName": "Hangeland",
                "CardType": "Player",
                "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/46815.png",
                "Cost": "4",
                "Attack": "3",
                "Stamina": "5",
                "Description": "Rock",
                "Club": "http://fh13.fhcdn.com/static/img/14/clubs/144.png",
                "Nation": "http://fh13.fhcdn.com/static/img/nations/36.png",
                "Position": "Defender",
                "PlayerDataUrl": "http://www.futhead.com/14/players/46815/",
                "Hearthstone" : "Senjin Shieldmasta"
              },
              {
                "Id": "152908",
                "Name": "Ashley Young",
                "ShortName": "Young",
                "CardType": "Player",
                "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/152908.png",
                "Cost": "5",
                "Attack": "4",
                "Stamina": "4",
                "Description": "Manager instructions: Score 3 direct impact points.",
                "Club": "http://fh13.fhcdn.com/static/img/14/clubs/11.png",
                "Nation": "http://fh13.fhcdn.com/static/img/nations/14.png",
                "Position": "Midfielder",
                "PlayerDataUrl": "http://www.futhead.com/14/players/152908/",
                "Hearthstone" : "Nightblade"
              },
              {
                "Id": "189461",
                "Name": "Jack Wilshere",
                "ShortName": "Wilshere",
                "CardType": "Player",
                "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/189461.png",
                "Cost": "6",
                "Attack": "6",
                "Stamina": "7",
                "Club": "http://fh13.fhcdn.com/static/img/14/clubs/1.png",
                "Nation": "http://fh13.fhcdn.com/static/img/nations/14.png",
                "Position": "Midfielder",
                "PlayerDataUrl": "http://www.futhead.com/14/players/189461/",
                "Hearthstone" : "Boulderfist Ogre"
              }
            ],
              "Hand": [
              {
                "Id": "152879",
                "Name": "Mark Noble",
                "ShortName": "Noble",
                "CardType": "Player",
                "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/152879.png",
                "Cost": "1",
                "Attack": "2",
                "Stamina": "1",
                "Description": "Manager instructions: Give a player +2 attack this turn.",
                "Club": "http://fh13.fhcdn.com/static/img/14/clubs/19.png",
                "Nation": "http://fh13.fhcdn.com/static/img/nations/14.png",
                "Position": "Midfielder",
                "Effects": { "PlayerEffects": "Rock" },
                "PlayerDataUrl": "http://www.futhead.com/14/players/152879/"
            },
            {
                "Id": "51394",
                "Name": "Kevin Nolan",
                "ShortName": "Nolan",
                "CardType": "Player",
                "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/51394.png",
                "Cost": "1",
                "Attack": "1",
                "Stamina": "1",
                "Description": "Manager instructions: Deal 1 damage.",
                "Club": "http://fh13.fhcdn.com/static/img/14/clubs/19.png",
                "Nation": "http://fh13.fhcdn.com/static/img/nations/14.png",
                "Position": "Midfielder",
                "PlayerDataUrl": "http://www.futhead.com/14/players/51394/"
            },
            {
                "Id": "175092",
                "Name": "Maynor Figueroa",
                "ShortName": "Figueroa",
                "CardType": "Player",
                "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/175092.png",
                "Cost": "1",
                "Attack": "1",
                "Stamina": "2",
                "Description": "Rock",
                "Club": "http://fh13.fhcdn.com/static/img/14/clubs/1952.png",
                "Nation": "http://fh13.fhcdn.com/static/img/nations/81.png",
                "Position": "Defender",
                "PlayerDataUrl": "http://www.futhead.com/14/players/175092/"
            }
          ],
              "Pitch": []
          },
            "AwayTeam": 
          {
              "UserId": "1",
              "TeamName": "The Mighty Reds",
              "Mana": "1",
              "Score": "0",
              "Deck": [
                {
                  "Id": "51394",
                  "Name": "Kevin Nolan",
                  "ShortName": "Nolan",
                  "CardType": "Player",
                  "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/51394.png",
                  "Cost": "1",
                  "Attack": "1",
                  "Stamina": "1",
                  "Description": "Manager instructions: Deal 1 damage.",
                  "Club": "http://fh13.fhcdn.com/static/img/14/clubs/19.png",
                  "Nation": "http://fh13.fhcdn.com/static/img/nations/14.png",
                  "Position": "Midfielder",
                  "PlayerDataUrl": "http://www.futhead.com/14/players/51394/",
                  "Hearthstone" : "Elven Archer"
                },
                {
                  "Id": "152879",
                  "Name": "Mark Noble",
                  "ShortName": "Noble",
                  "CardType": "Player",
                  "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/152879.png",
                  "Cost": "1",
                  "Attack": "2",
                  "Stamina": "1",
                  "Description": "Manager instructions: Restore 2 defence",
                  "Club": "http://fh13.fhcdn.com/static/img/14/clubs/19.png",
                  "Nation": "http://fh13.fhcdn.com/static/img/nations/14.png",
                  "Position": "Midfielder",
                  "PlayerDataUrl": "http://www.futhead.com/14/players/152879/",
                  "Hearthstone" : "Voodoo Doctor"
                },
                {
                    "Id": "192505",
                    "Name": "Romelu Lukaku",
                    "ShortName": "Lukaku",
                    "CardType": "Player",
                    "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/192505.png",
                    "Cost": "2",
                    "Attack": "3",
                    "Stamina": "2",
                    "Club": "http://fh13.fhcdn.com/static/img/14/clubs/7.png",
                    "Nation": "http://fh13.fhcdn.com/static/img/nations/7.png",
                    "Position": "Attacker",
                    "PlayerDataUrl": "http://www.futhead.com/14/players/192505/",
                    "Hearthstone" : "Bloodfen Raptor"
                },
                {
                    "Id": "137785",
                    "Name": "Robert Huth",
                    "ShortName": "Huth",
                    "CardType": "Player",
                    "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/137785.png",
                    "Cost": "2",
                    "Attack": "2",
                    "Stamina": "2",
                    "Description": "Rock",
                    "Club": "http://fh13.fhcdn.com/static/img/14/clubs/1806.png",
                    "Nation": "http://fh13.fhcdn.com/static/img/nations/21.png",
                    "Position": "Defender",
                    "PlayerDataUrl": "http://www.futhead.com/14/players/137785/",
                    "Hearthstone" : "Frostwolf Grunt"
                },
                {
                    "Id": "666",
                    "Name": "TBD counter player",
                    "ShortName": "Counter player",
                    "CardType": "Player",
                    "CardStyle": "Counter",
                    "PictureUrl": "http://fh13.fhcdn.com/static/img/blank.png",
                    "Cost": "1",
                    "Attack": "1",
                    "Stamina": "3",
                    "Description": "Whenever one of your players on the pitch increases their stamina draw a card.",
                    "Club": "http://fh13.fhcdn.com/static/img/14/clubs/1.png",
                    "Nation": "http://fh13.fhcdn.com/static/img/nations/45.png",
                    "Position": "Defender",
                    "PlayerDataUrl": "http://www.futhead.com/14/players/146562/",
                    "Hearthstone" : "Northshire Cleric"
                },
                {
                    "Id": "184432",
                    "Name": "Azpilicueta",
                    "ShortName": "Azpilicueta",
                    "CardType": "Player",
                    "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/184432.png",
                    "Cost": "3",
                    "Attack": "2",
                    "Stamina": "3",
                    "Description": "Manager instructions: bring a 1/1 player",
                    "Club": "http://fh13.fhcdn.com/static/img/14/clubs/5.png",
                    "Nation": "http://fh13.fhcdn.com/static/img/nations/45.png",
                    "Position": "Defender",
                    "PlayerDataUrl": "http://www.futhead.com/14/players/184432/",
                    "Hearthstone" : "Shattered Sun Cleric"
                },
                {
                    "Id": "53612",
                    "Name": "Per Mertesacker",
                    "ShortName": "Mertesacker",
                    "CardType": "Player",
                    "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/53612.png",
                    "Cost": "3",
                    "Attack": "1",
                    "Stamina": "4",
                    "Description": "Rock",
                    "Club": "http://fh13.fhcdn.com/static/img/14/clubs/1.png",
                    "Nation": "http://fh13.fhcdn.com/static/img/nations/21.png",
                    "Position": "Defender",
                    "PlayerDataUrl": "http://www.futhead.com/14/players/53612/",
                    "Hearthstone" : "Silverback Patriarch"
                },
                {
                    "Id": "184484",
                    "Name": "Gylfi Sigurðsson",
                    "ShortName": "Sigurðsson",
                    "CardType": "Player",
                    "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/184484.png",
                    "Cost": "4",
                    "Attack": "4",
                    "Stamina": "5",
                    "Club": "http://fh13.fhcdn.com/static/img/14/clubs/18.png",
                    "Nation": "http://fh13.fhcdn.com/static/img/nations/24.png",
                    "Position": "Midfielder",
                    "PlayerDataUrl": "http://www.futhead.com/14/players/184484/",
                    "Hearthstone" : "Chillwind Yeti"
                  },
                  {
                    "Id": "46815",
                    "Name": "Brede Hangeland",
                    "ShortName": "Hangeland",
                    "CardType": "Player",
                    "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/46815.png",
                    "Cost": "4",
                    "Attack": "3",
                    "Stamina": "5",
                    "Description": "Rock",
                    "Club": "http://fh13.fhcdn.com/static/img/14/clubs/144.png",
                    "Nation": "http://fh13.fhcdn.com/static/img/nations/36.png",
                    "Position": "Defender",
                    "PlayerDataUrl": "http://www.futhead.com/14/players/46815/",
                    "Hearthstone" : "Senjin Shieldmasta"
                },
                {
                    "Id": "166706",
                    "Name": "Martin Škrtel",
                    "ShortName": "Škrtel",
                    "CardType": "Player",
                    "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/166706.png",
                    "Cost": "5",
                    "Attack": "2",
                    "Stamina": "7",
                    "Description": "Wind up: When attacked, this player gains +3 attack.",
                    "Club": "http://fh13.fhcdn.com/static/img/14/clubs/9.png",
                    "Nation": "http://fh13.fhcdn.com/static/img/nations/43.png",
                    "Position": "Defender",
                    "PlayerDataUrl": "http://www.futhead.com/14/players/166706/",
                    "Hearthstone" : "Gurubashi Berserker"
                },
                 {
                    "Id": "49369",
                    "Name": "Fernando Torres",
                    "ShortName": "Torres",
                    "CardType": "Player",
                    "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/49369.png",
                    "Cost": "7",
                    "Attack": "9",
                    "Stamina": "5",
                    "Club": "http://fh13.fhcdn.com/static/img/14/clubs/5.png",
                    "Nation": "http://fh13.fhcdn.com/static/img/nations/45.png",
                    "Position": "Attacker",
                    "PlayerDataUrl": "http://www.futhead.com/14/players/49369/",
                    "Hearthstone" : "Core Hound"
                }
              ],
              "Hand": [],
              "Pitch": [
                {
                    "Id": "184457",
                    "Name": "Ricky van Wolfswinkel",
                    "ShortName": "van Wolfswinkel",
                    "CardType": "Player",
                    "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/184457.png",
                    "Cost": "1",
                    "Attack": "1",
                    "Stamina": "1",
                    "Description": "Pressure",
                    "Club": "http://fh13.fhcdn.com/static/img/14/clubs/1792.png",
                    "Nation": "http://fh13.fhcdn.com/static/img/nations/34.png",
                    "Position": "Attacker",
                    "PlayerDataUrl": "http://www.futhead.com/14/players/184457/"
                }
              ]
            }
          }

            // Save the actual game
            ServiceFirebase.Set("Games", "test", resetGame);
        });

        snapshot.ref().remove();
    });
};
exports.listen = listen;