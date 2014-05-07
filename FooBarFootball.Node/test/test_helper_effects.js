var should = require('should');
var helper = require("../helper_effects");

describe("Helper Effect Logic", function() {
   
   describe(".AddEffectToGameEffectStack with empty game", function() {
       it("should throw an exception for missing game parameter", function(){
           (function(){
               helper.addEffectToGameEffectStack();
            }).should.throw('game argument missing');
       });
   });

    describe(".AddEffectToGameEffectStack with empty effect", function() {
        it("should throw an exception for missing effect parameter", function(){
            (function(){
                helper.addEffectToGameEffectStack({});
            }).should.throw('effect argument missing');
        });
    });

    describe(".AddEffectToGameEffectStack with in-valid effect", function() {
        it("should throw an exception for an invalid effect", function(){
            (function(){
                // AddEffectToGameEffectStack(game, effect, team, card) {
                helper.addEffectToGameEffectStack({Id: 1}, {Invalid: 'what a load of rubbish'}, 1, {});
            }).should.throw('invalid effect');
        });
    });

    describe(".AddEffectToGameEffectStack with valid effect", function() {
        it("should result in the game effect stack containing the effect ", function(){
            var game = helper.addEffectToGameEffectStack({ Id: 1}, {'Type': 'Rock'}, 1, {});
            game.should.have.property('Effects');
            game.Effects.should.have.length(1);
            game.Effects[0].should.have.property({'Type': 'Rock'});
        });
    });
});