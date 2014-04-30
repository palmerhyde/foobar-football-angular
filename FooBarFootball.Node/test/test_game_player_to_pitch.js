var should = require('should');
var game = require("../game_player_to_pitch")
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
      Pitch: [],
      Hand: [{Id: 1, Cost : 2}],
      Manager : {Id: 1, Cost:2, Stamina: 30, CardType: 'Manager'}
    },
    AwayTeam : {
      UserId : 1,
      Mana : 0,
      Deck: [{Id: 1}],
      Pitch: [],
      Hand: [{Id: 1, Cost : 2}],
      Manager : {Id: 1, Cost:2, Stamina: 30, CardType: 'Manager'}
    }
  };
});

describe("Player To Pitch Logic", function() {
   
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
   })

   describe(".PlayTurn when not players turn", function() {
       it("should throw an exception for not being the users turn", function(){
           (function(){
              game.playTurn(validGame, 0, 1);
            }).should.throw('its not your turn');
       });
   });

   describe(".PlayTurn with invalid game parameter", function() {
       it("should throw an exception for being an invalid game", function(){
           (function(){
              game.playTurn({WhosTurnIsIt:1}, 1, 1);
            }).should.throw('not a valid game');
       });
   });

   describe(".PlayTurn with card not in hand for home team", function() {
       it("should throw an exception for being an invalid card id", function(){
           (function(){
              validGame.WhosTurnIsIt = 0;
              game.playTurn(validGame, 0, 666);
            }).should.throw('card not in hand');
       });
   });

   describe(".PlayTurn with card not in hand for away team", function() {
       it("should throw an exception for being an invalid card id", function(){
           (function(){
              validGame.WhosTurnIsIt = 1;
              game.playTurn(validGame, 1, 666);
            }).should.throw('card not in hand');
       });
   });

   describe(".PlayTurn with un-warmed up player", function() {
       it("should result in the player being in a warming up state", function(){
          validGame.WhosTurnIsIt = 0;
          validGame.HomeTeam.Mana = 3;
          validGame.HomeTeam.Hand[0].Id = 1;
          validGame.HomeTeam.Hand[0].Cost = 2;
          validGame.HomeTeam.Hand[0].IsWarmingUp = false;
          modifiedGame = game.playTurn(validGame, 0, 1);
          DeckHelper.findCardInDeck(1, modifiedGame.HomeTeam.Pitch)[0].should.have.property('IsWarmingUp', true);
       });
   });

    describe(".PlayTurn with un-warmed up player with the ~pressure~ effect", function() {
       it("should result in the player not being in warming up state", function(){
          validGame.WhosTurnIsIt = 0;
          validGame.HomeTeam.Mana = 3
          validGame.HomeTeam.Hand[0].Id = 1;
          validGame.HomeTeam.Hand[0].Cost = 2;
          validGame.HomeTeam.Hand[0].IsWarmingUp = false;
          validGame.HomeTeam.Hand[0].Effects = [{ Type: 'pressure'}];
          modifiedGame = game.playTurn(validGame, 0, 1);
          DeckHelper.findCardInDeck(1, modifiedGame.HomeTeam.Pitch)[0].should.have.property('IsWarmingUp', false);
       });
   });

    describe(".PlayTurn with un-warmed up player with the ~pressure~ effect with is warming up set to true", function() {
       it("should result in the player not being in warming up state", function(){
          validGame.WhosTurnIsIt = 0;
          validGame.HomeTeam.Mana = 3
          validGame.HomeTeam.Hand[0].Id = 1;
          validGame.HomeTeam.Hand[0].Cost = 2;
          validGame.HomeTeam.Hand[0].IsWarmingUp = true;
          validGame.HomeTeam.Hand[0].Effects = [{ Type: 'pressure'}];
          modifiedGame = game.playTurn(validGame, 0, 1);
          DeckHelper.findCardInDeck(1, modifiedGame.HomeTeam.Pitch)[0].should.have.property('IsWarmingUp', false);
       });
   });

   describe(".PlayTurn with un-warmed up player without the ~pressure~ effect with is warming up set to false", function() {
       it("should result in the player being in warming up state", function(){
          validGame.WhosTurnIsIt = 0;
          validGame.HomeTeam.Mana = 3
          validGame.HomeTeam.Hand[0].Id = 1;
          validGame.HomeTeam.Hand[0].Cost = 2;
          validGame.HomeTeam.Hand[0].IsWarmingUp = false;
          validGame.HomeTeam.Hand[0].Effects = [{ Type: 'unknown'}];
          modifiedGame = game.playTurn(validGame, 0, 1);
          DeckHelper.findCardInDeck(1, modifiedGame.HomeTeam.Pitch)[0].should.have.property('IsWarmingUp', true);
       });
   });

   describe(".PlayTurn with player with ~rock~ effect with targetable players on the pitch", function() {
        it("should result in players without the ~rock~ not being targetable ", function(){
            validGame.WhosTurnIsIt = 0;
            validGame.HomeTeam.Mana = 3
            validGame.HomeTeam.Hand[0].Id = 1;
            validGame.HomeTeam.Hand[0].Cost = 2;
            validGame.HomeTeam.Hand[0].IsWarmingUp = true;
            validGame.HomeTeam.Hand[0].Effects = [{ Type: 'rock'}];
            validGame.HomeTeam.Pitch.push({Id : 2, IsTargetable: true});
            validGame.HomeTeam.Pitch.push({Id : 3, IsTargetable: true});
            modifiedGame = game.playTurn(validGame, 0, 1);
            DeckHelper.findCardInDeck(1, modifiedGame.HomeTeam.Pitch)[0].should.have.property('IsTargetable', true);
            DeckHelper.findCardInDeck(2, modifiedGame.HomeTeam.Pitch)[0].should.have.property('IsTargetable', false);
            DeckHelper.findCardInDeck(3, modifiedGame.HomeTeam.Pitch)[0].should.have.property('IsTargetable', false);
        });
    });

    describe(".PlayTurn with player with ~restore stamina~ effect targeting a valid player the pitch", function() {
        it("should result in the targeted players stamina being restored ", function(){
            validGame.WhosTurnIsIt = 0;
            validGame.HomeTeam.Mana = 3
            validGame.HomeTeam.Hand[0].Id = 1;
            validGame.HomeTeam.Hand[0].Cost = 2;
            validGame.HomeTeam.Hand[0].IsWarmingUp = true;
            validGame.HomeTeam.Hand[0].Effects = [{ Type: "Restore Stamina", Value: 2 }];
            validGame.HomeTeam.Pitch.push({Id : 2, IsTargetable: true, Stamina: 1, OriginalStamina: 3 });
            modifiedGame = game.playTurn(validGame, 0, 1, 2);
            DeckHelper.findCardInDeck(2, modifiedGame.HomeTeam.Pitch)[0].should.have.property('Stamina', 3);
        });
    });

   describe(".PlayTurn with 1 currency for a card costing 2", function() {
       it("should throw an exception for costing too much", function(){
           (function(){
              validGame.WhosTurnIsIt = 0;
              validGame.HomeTeam.Mana = 1;
              game.playTurn(validGame, 0, 1);
            }).should.throw('not enough currency');
       });
   });

   describe(".PlayTurn with 3 currency for a card costing 2", function() {
       it("should result in the card moved from hand onto the pitch and having 1 currency left", function(){
          validGame.WhosTurnIsIt = 0;
          validGame.HomeTeam.Mana = 3
          validGame.HomeTeam.Hand[0].Id = 1;
          validGame.HomeTeam.Hand[0].Cost = 2;
          modifiedGame = game.playTurn(validGame, 0, 1);
          modifiedGame.HomeTeam.should.have.property('Mana', 1);
          DeckHelper.findCardInDeck(1, modifiedGame.HomeTeam.Hand).should.be.undefined;
          DeckHelper.findCardInDeck(1, modifiedGame.HomeTeam.Pitch)[0].should.have.property('Id', 1);
       });
   });
});