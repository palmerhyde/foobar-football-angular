var should = require('should');
var effect = require("../effect_restore_stamina");
var DeckHelper = require('../helper_deck.js');

describe("Effect Restore Stamina Logic", function() {
   
   describe(".ApplyEffect with empty effect", function() {
       it("should throw an exception for missing effect parameter", function(){
           (function(){
              effect.applyEffect();
            }).should.throw('missing effect parameter');
       });
   });

    describe(".ApplyEffect with empty target player", function() {
        it("should throw an exception for missing targetPlayer parameter", function(){
            (function(){
                effect.applyEffect({Type: "Restore Stamina", Value: 2 });
            }).should.throw('missing targetPlayer parameter');
        });
    });

    describe(".ApplyEffect with invalid effect type", function() {
        it("should throw an exception for an invalid effect type", function(){
            (function(){
                effect.applyEffect({Type: "incorrect", Value: 2 }, {Id: 1});
            }).should.throw('invalid effect type');
        });
    });

    describe(".ApplyEffect with target player with 3 original stamina, 3 stamina data and a +2 buff", function() {
        it("should result in the target player having 5 stamina", function(){
            var targetCard = effect.applyEffect({Type: "Restore Stamina", Value: 2 }, {Id: 1, Stamina : 3, OriginalStamina: 3});
            targetCard.should.have.property('Stamina', 3);
        });
    });

    describe(".ApplyEffect with target player with 3 original stamina, 2 stamina data and a +2 buff", function() {
        it("should result in the target player having 3 stamina", function(){
            var targetCard = effect.applyEffect({ Type: "Restore Stamina", Value: 2 }, {Id: 1, Stamina : 2, OriginalStamina:3 });
            targetCard.should.have.property('Stamina', 3);
        });
    });

    describe(".ApplyEffect with target player with 3 original stamina, 1 stamina and a +2 buff", function() {
       it("should result in the target player having 5 stamina", function(){
          var targetCard = effect.applyEffect({Type: "Restore Stamina", Value: 3 }, {Id: 1, Stamina : 1, OriginalStamina: 3});
           targetCard.should.have.property('Stamina', 3);
       });
   });
});