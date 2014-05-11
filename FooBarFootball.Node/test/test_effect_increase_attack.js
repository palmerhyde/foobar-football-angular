var should = require('should');
var effect = require("../effect_increase_attack");
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
            Pitch: [{}, {}],
            Hand: [{}, {}],
            Manager : {Id: 1, Cost:2, Stamina: 30, CardType: 'Manager'}
        },
        AwayTeam : {
            UserId : 1,
            Mana : 0,
            Deck: [{}, {}],
            Pitch: [{}, {}],
            Hand: [{}, {}],
            Manager : {Id: 1, Cost:2, Stamina: 30, CardType: 'Manager'}
        }
    };
});

describe("Effect Increase Attack Logic", function() {

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
            }).should.throw('invalid effect type');
        });
    });

    describe(".ApplyEffect with missing effect value", function() {
        it("should throw an exception for a missing effect value", function(){
            (function(){
                var validGame = { Id: 1};
                var invalidEffect = {Type: "Increase Attack"};
                effect.applyEffect(validGame, invalidEffect);
            }).should.throw('effect must have a value');
        });
    });

    describe(".ApplyEffect with target player with 3 original Attack, 3 attack and a +1 buff", function() {
        it("should result in the target player having 4 attack", function(){
            validGame.Id = 1;
            validGame.HomeTeam.Id = 1;
            validGame.HomeTeam.Pitch[0].Id = 1;
            validGame.HomeTeam.Pitch[0].Cost = 2;
            validGame.HomeTeam.Pitch[0].Attack = 3;
            validGame.HomeTeam.Pitch[0].OriginalAttack = 3;
            var validEffect = {};
            validEffect.Type = "Increase Attack";
            validEffect.Target = 1;
            validEffect.Value = 1;
            validEffect.TeamId = 1;
            var modifiedGame = effect.applyEffect(validGame, validEffect);
            modifiedGame.HomeTeam.Pitch[0].should.have.property('Attack', 4);
        });
    });

//    describe(".ApplyEffect (Away Team) with target player with 3 original stamina, 1 stamina and a -2 buff", function() {
//        it("should result in the target player having 1 stamina", function(){
//            validGame.Id = 1;
//            validGame.AwayTeam.Id = 2;
//            validGame.AwayTeam.Mana = 3;
//            validGame.AwayTeam.Pitch[0].Id = 2;
//            validGame.AwayTeam.Pitch[0].Cost = 2;
//            validGame.AwayTeam.Pitch[0].Stamina = 3;
//            validGame.AwayTeam.Pitch[0].OriginalStamina = 3;
//            var validEffect = {};
//            validEffect.Type = "Deal Damage";
//            validEffect.Target = 2;
//            validEffect.Value = 2;
//            validEffect.TeamId = 2;
//            var modifiedGame = effect.applyEffect(validGame, validEffect);
//            modifiedGame.AwayTeam.Pitch[0].should.have.property('Stamina', 1);
//        });
//    });
//
//    describe(".ApplyEffect with home team player not on pitch", function() {
//        it("should throw an exception for card not on pitch", function(){
//            (function(){
//                validGame.Id = 1;
//                validGame.HomeTeam.Id = 1;
//                validGame.HomeTeam.Mana = 3;
//                validGame.HomeTeam.Pitch[0].Id = 1;
//                validGame.HomeTeam.Pitch[0].Cost = 2;
//                validGame.HomeTeam.Pitch[0].Stamina = 3;
//                validGame.HomeTeam.Pitch[0].OriginalStamina = 3;
//                var validEffect = {};
//                validEffect.Type = "Deal Damage";
//                validEffect.Target = 666;
//                validEffect.Value = 1;
//                validEffect.TeamId = 1;
//                effect.applyEffect(validGame, validEffect);
//            }).should.throw('card not on pitch');
//        });
//    });
//
//    describe(".ApplyEffect with Away team player not on pitch", function() {
//        it("should throw an exception for card not on pitch", function(){
//            (function(){
//                validGame.Id = 1;
//                validGame.AwayTeam.Id = 2;
//                validGame.AwayTeam.Mana = 3;
//                validGame.AwayTeam.Pitch[0].Id = 2;
//                validGame.AwayTeam.Pitch[0].Cost = 2;
//                validGame.AwayTeam.Pitch[0].Stamina = 3;
//                validGame.AwayTeam.Pitch[0].OriginalStamina = 3;
//                var validEffect = {};
//                validEffect.Type = "Deal Damage";
//                validEffect.Target = 666;
//                validEffect.Value = 2;
//                validEffect.TeamId = 2;
//                effect.applyEffect(validGame, validEffect);
//            }).should.throw('card not on pitch');
//        });
//    });
});