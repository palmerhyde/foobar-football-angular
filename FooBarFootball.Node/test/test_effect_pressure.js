var should = require('should');
var effect = require("../effect_pressure");
var DeckHelper = require('../helper_deck.js');
var validGame = {};

beforeEach(function(){
    validGame = {
        WhosTurnIsIt: 1,
        UserId: 0,
        Turn: 5,
        HomeTeam : {
            UserId : 0,
            Mana : 5,
            Deck: [{Id: 1}, {}],
            Pitch: [],
            Hand: [{}, {}],
            Manager : {Id: 1, Cost:2, Stamina: 30, CardType: 'Manager'}
        },
        AwayTeam : {
            UserId : 1,
            Mana : 0,
            Deck: [{}, {}],
            Pitch: [],
            Hand: [{}, {}],
            Manager : {Id: 1, Cost:2, Stamina: 30, CardType: 'Manager'}
        }
    };
});

describe("Effect Pressure Logic", function() {

    describe(".ApplyEffect with empty game", function() {
        it("should throw an exception for missing game parameter", function(){
            (function(){
                effect.applyEffect();
            }).should.throw('missing game parameter');
        });
    });

    describe(".ApplyEffect with empty effect", function() {
       it("should throw an exception for missing effect parameter", function(){
           (function(){
              effect.applyEffect({});
            }).should.throw('missing effect parameter');
       });
   });

    describe(".ApplyEffect with invalid effect type", function() {
        it("should throw an exception for an invalid effect type", function(){
            (function(){
                var validGame = { Id: 1};
                var invalidEffect = {Type: "incorrect", Value: 2 };
                effect.applyEffect(validGame, invalidEffect);
            }).should.throw('Effect of type pressure expected');
        });
    });

    describe(".ApplyEffect with home team player not on pitch", function() {
        it("should throw an exception for card not on pitch", function(){
            (function(){
                validGame.WhosTurnIsIt = 0;
                validGame.HomeTeam.Id = 1;
                validGame.HomeTeam.Mana = 3
                validGame.HomeTeam.Pitch.push({Id : 1, IsRock: false});
                var validEffect = {};
                validEffect.Type = "Pressure";
                validEffect.Target = 666;
                validEffect.TeamId = 1;
                effect.applyEffect(validGame, validEffect);
            }).should.throw('card not on pitch');
        });
    });

    describe(".ApplyEffect with away team player not on pitch", function() {
        it("should throw an exception for card not on pitch", function(){
            (function(){
                validGame.WhosTurnIsIt = 0;
                validGame.AwayTeam.Id = 2;
                validGame.AwayTeam.Mana = 3
                validGame.AwayTeam.Pitch.push({Id : 1, IsRock: false});
                var validEffect = {};
                validEffect.Type = "Pressure";
                validEffect.Target = 666;
                validEffect.TeamId = 2;
                effect.applyEffect(validGame, validEffect);
            }).should.throw('card not on pitch');
        });
    });

    describe(".ApplyEffect pressure to home team player", function() {
        it("should result in the target player having the pressure effect ", function(){
            validGame.WhosTurnIsIt = 0;
            validGame.HomeTeam.Id = 1;
            validGame.HomeTeam.Mana = 3
            validGame.HomeTeam.Pitch.push({Id : 1, IsWarmingUp: true});
            var validEffect = {};
            validEffect.Type = "Pressure";
            validEffect.Target = 1;
            validEffect.TeamId = 1;
            modifiedGame = effect.applyEffect(validGame, validEffect);
            DeckHelper.findCardInDeck(1, modifiedGame.HomeTeam.Pitch)[0].should.have.property('IsWarmingUp', false);
        });
    });

    describe(".ApplyEffect pressure to away team player", function() {
        it("should result in the target player having the pressure effect ", function(){
            validGame.WhosTurnIsIt = 0;
            validGame.AwayTeam.Id = 2;
            validGame.AwayTeam.Mana = 3
            validGame.AwayTeam.Pitch.push({Id : 1, IsWarmingUp: true});
            var validEffect = {};
            validEffect.Type = "Pressure";
            validEffect.Target = 1;
            validEffect.TeamId = 2;
            modifiedGame = effect.applyEffect(validGame, validEffect);
            DeckHelper.findCardInDeck(1, modifiedGame.AwayTeam.Pitch)[0].should.have.property('IsWarmingUp', false);
        });
    });
});