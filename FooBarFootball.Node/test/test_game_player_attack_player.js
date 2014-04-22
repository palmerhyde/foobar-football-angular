var should = require('should');
var game = require("../game_player_attack_player")
var DeckHelper = require('../helper_deck.js');
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
      Pitch: [{Id: 1, IsWarmingUp: true, Attack: 2}, {Id: 2, IsWarmingUp: true, Attack: 2}],
      Hand: [],
      Manager : {Id: 1, Cost:2, Stamina: 30, CardType: 'Manager'}
    },
    AwayTeam : {
      UserId : 1,
      Mana : 0,
      Deck: [{Id: 1}],
      Pitch: [{Id: 1, IsWarmingUp: true, Attack: 2}, {Id: 2, IsWarmingUp: true, Attack: 2}],
      Hand: [],
      Manager : {Id: 1, Cost:2, Stamina: 30, CardType: 'Manager'}
    }
  };
});

describe("Player Attack Player Logic", function() {
   
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
              game.playTurn(validGame);
            }).should.throw('missing userId parameter');
       });
   });

   describe(".PlayTurn with empty cardId parameter", function() {
       it("should throw an exception for missing cardId parameter", function(){
           (function(){
              game.playTurn(validGame, 0);
            }).should.throw('missing cardId parameter');
       });
   });

   describe(".PlayTurn with empty targetCardId parameter", function() {
       it("should throw an exception for missing targetCardId parameter", function(){
           (function(){
              game.playTurn(validGame, 0, 1);
            }).should.throw('missing targetCardId parameter');
       });
   });

   describe(".PlayTurn when not players turn", function() {
       it("should throw an exception for not being the users turn", function(){
           (function(){
              game.playTurn(validGame, 0, 1, 2);
            }).should.throw('its not your turn');
       });
   });

   describe(".PlayTurn with invalid game parameter", function() {
       it("should throw an exception for being an invalid game", function(){
           (function(){
              game.playTurn({WhosTurnIsIt:1}, 1, 1, 2);
            }).should.throw('not a valid game');
       });
   });

   describe(".PlayTurn with card not on pitch for home team", function() {
       it("should throw an exception for being an invalid card id", function(){
           (function(){
              validGame.WhosTurnIsIt = 0;
              game.playTurn(validGame, 0, 666, 2);
            }).should.throw('card not on pitch');
       });
   });

   describe(".PlayTurn with card not on pitch for away team", function() {
       it("should throw an exception for being an invalid card id", function(){
           (function(){
              validGame.WhosTurnIsIt = 1;
              game.playTurn(validGame, 1, 666, 2);
            }).should.throw('card not on pitch');
       });
   });


   describe(".PlayTurn with target card not on pitch for home team", function() {
       it("should throw an exception for being an invalid target card id", function(){
           (function(){
              validGame.WhosTurnIsIt = 0;
              game.playTurn(validGame, 0, 1, 666);
            }).should.throw('target card not on pitch');
       });
   });

   describe(".PlayTurn with target card not on pitch for away team", function() {
       it("should throw an exception for being an invalid target card id", function(){
           (function(){
              validGame.WhosTurnIsIt = 1;
              game.playTurn(validGame, 1, 2, 666);
            }).should.throw('target card not on pitch');
       });
   });

   describe(".PlayTurn with target card not being targetable", function() {
       it("should throw an exception for not being targetable", function(){
           (function(){
              validGame.WhosTurnIsIt = 0;
              validGame.HomeTeam.Pitch[0].Id = 1;
              validGame.HomeTeam.Pitch[0].IsTargetable = true;
              validGame.HomeTeam.Pitch[0].CanAttack = true;
              validGame.HomeTeam.Pitch[0].Attack = 1;
              validGame.HomeTeam.Pitch[0].Stamina = 2;
              validGame.AwayTeam.Pitch[0].Id = 2;
              validGame.AwayTeam.Pitch[0].IsTargetable = false;
              validGame.AwayTeam.Pitch[0].CanAttack = true;
              validGame.AwayTeam.Pitch[0].Attack = 1;
              validGame.AwayTeam.Pitch[0].Stamina = 2;
              modifiedGame = game.playTurn(validGame, 0, 1, 2);
            }).should.throw('target card is not targetable');
       });
   });

   describe(".PlayTurn with card not being able to attack", function() {
       it("should throw an exception for not being attackabe", function(){
           (function(){
              validGame.WhosTurnIsIt = 0;
              validGame.HomeTeam.Pitch[0].Id = 1;
              validGame.HomeTeam.Pitch[0].IsTargetable = true;
              validGame.HomeTeam.Pitch[0].CanAttack = false;
              validGame.HomeTeam.Pitch[0].Attack = 1;
              validGame.HomeTeam.Pitch[0].Stamina = 2;
              validGame.AwayTeam.Pitch[0].Id = 2;
              validGame.AwayTeam.Pitch[0].IsTargetable = true;
              validGame.AwayTeam.Pitch[0].CanAttack = false;
              validGame.AwayTeam.Pitch[0].Attack = 1;
              validGame.AwayTeam.Pitch[0].Stamina = 2;
              modifiedGame = game.playTurn(validGame, 0, 1, 2);
            }).should.throw('card cannot attack');
       });
   });

   describe(".PlayTurn with vanilla 1/2 attacking a vanilla 1/2", function() {
       it("should result in a vanilla 1/1 and a vanilla 1/1", function(){
          validGame.WhosTurnIsIt = 0;
          validGame.HomeTeam.Pitch[0].Id = 1;
          validGame.HomeTeam.Pitch[0].IsTargetable = true;
          validGame.HomeTeam.Pitch[0].CanAttack = true;
          validGame.HomeTeam.Pitch[0].Attack = 1;
          validGame.HomeTeam.Pitch[0].Stamina = 2;
          validGame.AwayTeam.Pitch[0].Id = 2;
          validGame.AwayTeam.Pitch[0].IsTargetable = true;
          validGame.AwayTeam.Pitch[0].CanAttack = true;
          validGame.AwayTeam.Pitch[0].Attack = 1;
          validGame.AwayTeam.Pitch[0].Stamina = 2;
          modifiedGame = game.playTurn(validGame, 0, 1, 2);
          modifiedGame.HomeTeam.Pitch[0].should.have.property('Stamina', 1);
          modifiedGame.AwayTeam.Pitch[0].should.have.property('Stamina', 1);
       });
   });

   describe(".PlayTurn with vanilla 4/4 attacking a vanilla 1/2", function() {
       it("should result in a vanilla 4/3 and a discarded card", function(){
          validGame.WhosTurnIsIt = 0;
          validGame.HomeTeam.Pitch[0].Id = 1;
          validGame.HomeTeam.Pitch[0].IsTargetable = true;
          validGame.HomeTeam.Pitch[0].CanAttack = true;
          validGame.HomeTeam.Pitch[0].Attack = 4;
          validGame.HomeTeam.Pitch[0].Stamina = 4;
          validGame.AwayTeam.Pitch[0].Id = 2;
          validGame.AwayTeam.Pitch[0].IsTargetable = true;
          validGame.AwayTeam.Pitch[0].CanAttack = true;
          validGame.AwayTeam.Pitch[0].Attack = 1;
          validGame.AwayTeam.Pitch[0].Stamina = 2;
          modifiedGame = game.playTurn(validGame, 0, 1, 2);
          modifiedGame.HomeTeam.Pitch[0].should.have.property('Stamina', 3);
          DeckHelper.findCardInDeck(2, modifiedGame.AwayTeam.Pitch).should.be.undefined;
       });
   });

   describe(".PlayTurn with vanilla 2/3 attacking a vanilla 4/4", function() {
       it("should result in a discarded card and a 4/2 vanilla", function(){
          validGame.WhosTurnIsIt = 1;
          validGame.HomeTeam.Pitch[0].Id = 1;
          validGame.HomeTeam.Pitch[0].IsTargetable = true;
          validGame.HomeTeam.Pitch[0].CanAttack = true;
          validGame.HomeTeam.Pitch[0].Attack = 2;
          validGame.HomeTeam.Pitch[0].Stamina = 3;
          validGame.AwayTeam.Pitch[0].Id = 2;
          validGame.AwayTeam.Pitch[0].IsTargetable = true;
          validGame.AwayTeam.Pitch[0].CanAttack = true;
          validGame.AwayTeam.Pitch[0].Attack = 4;
          validGame.AwayTeam.Pitch[0].Stamina = 4;
          modifiedGame = game.playTurn(validGame, 1, 2, 1);
          modifiedGame.AwayTeam.Pitch[0].should.have.property('Stamina', 2);
          DeckHelper.findCardInDeck(2, modifiedGame.HomeTeam.Pitch).should.be.undefined;
       });
   });

   describe(".PlayTurn with vanilla 3/3 attacking a vanilla 3/3", function() {
       it("should result in both cards being discarded", function(){
          validGame.WhosTurnIsIt = 0;
          validGame.HomeTeam.Pitch[0].Id = 1;
          validGame.HomeTeam.Pitch[0].IsTargetable = true;
          validGame.HomeTeam.Pitch[0].CanAttack = true;
          validGame.HomeTeam.Pitch[0].Attack = 3;
          validGame.HomeTeam.Pitch[0].Stamina = 3;
          validGame.AwayTeam.Pitch[0].Id = 2;
          validGame.AwayTeam.Pitch[0].IsTargetable = true;
          validGame.AwayTeam.Pitch[0].CanAttack = true;
          validGame.AwayTeam.Pitch[0].Attack = 3;
          validGame.AwayTeam.Pitch[0].Stamina = 3;
          modifiedGame = game.playTurn(validGame, 0, 1, 2);
          DeckHelper.findCardInDeck(1, modifiedGame.HomeTeam.Pitch).should.be.undefined;
          DeckHelper.findCardInDeck(2, modifiedGame.AwayTeam.Pitch).should.be.undefined;
       });
   });
});