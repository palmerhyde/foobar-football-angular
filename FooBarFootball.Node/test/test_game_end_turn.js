var assert = require("assert")
var should = require('should');
var game = require("../game_end_turn")
var validGame;

beforeEach(function(){
  validGame = {
    WhosTurnIsIt: 1,
    UserId: 0,
    Turn: 5,
    HomeTeam : {
      UserId : 0,
      Mana : 5,
      Deck: [{Id: 1}],
      Pitch: [{id: 1, IsWarmingUp: true}, {id: 2, IsWarmingUp: true}],
      Hand: []
    },
    AwayTeam : {
      UserId : 1,
      Mana : 0,
      Deck: [{Id: 1}],
      Pitch: [{id: 1, IsWarmingUp: true}, {id: 2, IsWarmingUp: true}],
      Hand: []
    }
  };
});

describe("End Turn Logic", function() {
   describe(".PlayTurn with empty game parameter", function() {
       it("should throw an exception for missing game parameter", function(){
           (function(){
              game.playTurn();
            }).should.throw('missing game parameter');
       });
   });

   describe(".PlayTurn with empty userId parameter", function() {
       it("should throw an exception for missing userId parameter", function(){
           (function(){
              game.playTurn({});
            }).should.throw('missing userId parameter');
       });
   });

   describe(".PlayTurn when not players turn", function() {
       it("should throw an exception for missing userId parameter", function(){
           (function(){
              game.playTurn(validGame, 0);
            }).should.throw('its not your turn');
       });
   });

   describe(".PlayTurn with invalid game parameter", function() {
       it("should throw an exception for being an invalid game", function(){
           (function(){
              game.playTurn({WhosTurnIsIt:1}, 1);
            }).should.throw('not a valid game');
       });
   });

   describe(".PlayTurn with undefined hand, pitch and deck", function() {
       it("should result in defined hand, pitch and deck being arrays", function(){
           validGame.HomeTeam.Hand = undefined;
           validGame.AwayTeam.Hand = undefined;
           validGame.HomeTeam.Pitch = undefined;
           validGame.AwayTeam.Pitch = undefined;
           validGame.HomeTeam.Deck = undefined;
           validGame.AwayTeam.Deck = undefined;
           validGame.WhosTurnIsIt = 0;
           var modifiedGame =  game.playTurn(validGame, 0);
           modifiedGame.HomeTeam.Hand.should.be.an.Array;
           modifiedGame.AwayTeam.Hand.should.be.an.Array;
           modifiedGame.HomeTeam.Deck.should.be.an.Array;
           modifiedGame.AwayTeam.Deck.should.be.an.Array;
           modifiedGame.HomeTeam.Pitch.should.be.an.Array;
           modifiedGame.AwayTeam.Pitch.should.be.an.Array;
       });
   });

   describe(".PlayTurn with current user being the home team", function() {
       it("should result in WhosTurnIsIt being the away team", function(){
           validGame.WhosTurnIsIt = 0;
           var modifiedGame =  game.playTurn(validGame, 0);
           modifiedGame.should.have.property('WhosTurnIsIt', 1);
       });

       it("should result in the home teams mana being 0", function(){
           validGame.WhosTurnIsIt = 0;
           var modifiedGame =  game.playTurn(validGame, 0);
           modifiedGame.HomeTeam.should.have.property('Mana', 0);
       });

       it("should result in the away teams mana being 6", function(){
           validGame.WhosTurnIsIt = 0;
           var modifiedGame =  game.playTurn(validGame, 0);
           modifiedGame.AwayTeam.should.have.property('Mana', 5);
       });

       it("should result in the away team being dealt a card to their hand", function(){
           validGame.WhosTurnIsIt = 0;
           var handCount = validGame.AwayTeam.Hand.length;
           var deckCount = validGame.AwayTeam.Deck.length
           var modifiedGame =  game.playTurn(validGame, 0);
           modifiedGame.AwayTeam.Deck.should.have.length(deckCount - 1)
           modifiedGame.AwayTeam.Hand.should.have.length(handCount + 1)
       });

       it("should result in the opponents team having all players warmed up", function(){
           validGame.WhosTurnIsIt = 0;
           var modifiedGame =  game.playTurn(validGame, 0);
           modifiedGame.AwayTeam.Pitch.should.not.containDeep([{IsWarmingUp: true}]);
       });
   });


   describe(".PlayTurn with current user being the away team", function() {
       it("should result in WhosTurnIsIt being the home team", function(){
           var modifiedGame =  game.playTurn(validGame, 1);
           modifiedGame.should.have.property('WhosTurnIsIt', 0);
       });

       it("should result in the away teams mana being 0", function(){
           validGame.WhosTurnIsIt = 1;
           var modifiedGame =  game.playTurn(validGame, 1);
           modifiedGame.AwayTeam.should.have.property('Mana', 0);
       });

       it("should result in the home teams mana being 6", function(){
           validGame.WhosTurnIsIt = 1;
           var modifiedGame =  game.playTurn(validGame, 1);
           modifiedGame.HomeTeam.should.have.property('Mana', 6);
       });

       it("should result in the home team being dealt a card to their hand", function(){
           validGame.WhosTurnIsIt = 1;
           var handCount = validGame.HomeTeam.Hand.length;
           var deckCount = validGame.HomeTeam.Deck.length
           var modifiedGame =  game.playTurn(validGame, 1);
           modifiedGame.HomeTeam.Deck.should.have.length(deckCount - 1)
           modifiedGame.HomeTeam.Hand.should.have.length(handCount + 1)
       });

       it("should result in the opponents team having all players warmed up", function(){
           validGame.WhosTurnIsIt = 1;
           var modifiedGame =  game.playTurn(validGame, 1);
           modifiedGame.HomeTeam.Pitch.should.not.containDeep([{IsWarmingUp: true}]);
       });
   });
});


function WarmUpPlayers(players) {
    if (players) {
        for (var i=0; i < players.length; i++) {
            players[i].IsWarmingUp = false;
        }
    }
}