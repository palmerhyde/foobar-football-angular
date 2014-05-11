var should = require('should');
var game = require("../../game_player_to_pitch")
var DeckHelper = require('../../helper_deck.js');
var GameHelper = require('../../helper_game.js')
var Cards = require('../../Cards/cards.js');
var validGame = {};
var kevinNolan = {};
var vanilla_2_2 = {};

beforeEach(function(){
    kevinNolan = Cards.players.kevin_nolan.data;
    vanilla_2_2 = {
        "Id": 2,
        "Name": "Vanilla 2 2",
        "CardType": "Player",
        "Cost": "2",
        "Attack": "2",
        "Stamina": "2"
    }
});

describe("Player: Kevin Nolan", function() {

    describe(".When brought onto the pitch targeting a vanilla 2 2", function() {
        it("the vanilla 2 2 should have 1 stamina", function(){
            var validGame = {
              Id: 1,
              WhosTurnIsIt: 1,
              HomeTeam: {
                  Id: 1,
                  Mana: 5,
                  Hand: [kevinNolan],
                  Manager: {},
                  UserId: 1
              },
              AwayTeam: {
                    Id: 2,
                    Mana: 5,
                    Pitch: [vanilla_2_2],
                    Manager: {},
                    UserId: 2
                }
            };

            kevinNolan.Effects[0].Target = 2;
            kevinNolan.Effects[0].TeamId = 2;
            var modifiedGame = game.playTurn(validGame, 1, 51394, 2);
            DeckHelper.findCardInDeck(2, modifiedGame.AwayTeam.Pitch)[0].should.have.property('Stamina', 1);
        });
    });

    describe(".When brought onto the pitch targeting a vanilla 1 1", function() {
        it("the vanilla 2 2 should have 1 stamina", function(){
            var validGame = {
                Id: 1,
                WhosTurnIsIt: 1,
                HomeTeam: {
                    Id: 1,
                    Mana: 5,
                    Hand: [kevinNolan],
                    Manager: {},
                    UserId: 1
                },
                AwayTeam: {
                    Id: 2,
                    Mana: 5,
                    Pitch: [vanilla_2_2],
                    Manager: {},
                    UserId: 2
                }
            };

            kevinNolan.Effects[0].Target = 2;
            kevinNolan.Effects[0].TeamId = 2;
            vanilla_2_2.Attack = 1;
            vanilla_2_2.Stamina = 1;
            var modifiedGame = game.playTurn(validGame, 1, 51394, 2);
            modifiedGame.AwayTeam.Pitch.should.have.length(0);
        });
    });
});