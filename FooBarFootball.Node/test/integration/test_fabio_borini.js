var should = require('should');
var game = require("../../game_player_to_pitch")
var attackPlayer = require("../../game_player_attack_player")
var DeckHelper = require('../../helper_deck.js');
var GameHelper = require('../../helper_game.js')
var Cards = require('../../Cards/cards.js');
var validGame = {};
var fabioBorini = {};
var vanilla_2_2 = {};

beforeEach(function(){
    fabioBorini = Cards.players.fabio_borini.data;
    vanilla_2_2 = {
        "Id": 2,
        "Name": "Vanilla 2 2",
        "CardType": "Player",
        "Cost": "2",
        "Attack": "2",
        "Stamina": "2",
        "IsTargetable" : true
    }
});

describe("Player: Fabio Borini", function() {

    describe(".When brought onto the pitch", function() {
        it("the game should have 0 effects", function(){
            var validGame = {
              Id: 1,
              WhosTurnIsIt: 1,
              HomeTeam: {
                  Id: 1,
                  Mana: 5,
                  Hand: [fabioBorini],
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

            var modifiedGame = game.playTurn(validGame, 1, 186200);
            modifiedGame.Effects.should.have.length(0);
        });
    });

    describe(".When on the pitch and targeting a vanilla 2 2", function() {
        it("the vanilla 2 2 not be on the pitch", function(){
            var validGame = {
                Id: 1,
                WhosTurnIsIt: 1,
                HomeTeam: {
                    Id: 1,
                    Mana: 5,
                    Pitch: [fabioBorini],
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

            var modifiedGame = attackPlayer.playTurn(validGame, 1, 186200, 2);
            modifiedGame.AwayTeam.Pitch.should.have.length(0);
        });
    });

    describe(".When on the pitch and targeting a vanilla 2 4", function() {
        it("the vanilla 2 4 should have 2 stamina", function(){
            var validGame = {
                Id: 1,
                WhosTurnIsIt: 1,
                HomeTeam: {
                    Id: 1,
                    Mana: 5,
                    Pitch: [fabioBorini],
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

            vanilla_2_2.Stamina = 4;
            var modifiedGame = attackPlayer.playTurn(validGame, 1, 186200, 2);
            DeckHelper.findCardInDeck(2, modifiedGame.AwayTeam.Pitch)[0].should.have.property('Stamina', 2);
            modifiedGame.AwayTeam.Pitch.should.have.length(1);
        });
    });
});