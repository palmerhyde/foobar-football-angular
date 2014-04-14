var should = require('should');
var game = require("../game_player_attack_manager")
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

describe("Player Attack Manager Logic", function() {
   
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

   describe(".PlayTurn with card not on pitch for home team", function() {
       it("should throw an exception for being an invalid card id", function(){
           (function(){
              validGame.WhosTurnIsIt = 0;
              game.playTurn(validGame, 0, 666);
            }).should.throw('card not on pitch');
       });
   });

   describe(".PlayTurn with card not on pitch for away team", function() {
       it("should throw an exception for being an invalid card id", function(){
           (function(){
              validGame.WhosTurnIsIt = 1;
              game.playTurn(validGame, 1, 666);
            }).should.throw('card not on pitch');
       });
   });

   describe(".PlayTurn with invalid manager for home team", function() {
       it("should throw an exception for being a valid manager", function(){
           (function(){
              validGame.WhosTurnIsIt = 0;
              validGame.AwayTeam.Manager.Id = undefined;
              game.playTurn(validGame, 0, 1);
            }).should.throw('not a valid manager');
       });
   });

   describe(".PlayTurn with invalid manager for away team", function() {
       it("should throw an exception for being a valid manager", function(){
           (function(){
              validGame.WhosTurnIsIt = 1;
              validGame.HomeTeam.Manager.Id = undefined;
              game.playTurn(validGame, 1, 1);
            }).should.throw('not a valid manager');
       });
   });

   describe(".PlayTurn with home manager stamina 30 and player with attack of 2", function() {
       it("should result in a manager with stamina of 28", function(){
          validGame.WhosTurnIsIt = 1;
          modifiedGame = game.playTurn(validGame, 1, 1);
          modifiedGame.HomeTeam.Manager.should.have.property('Stamina', 28);
       });
   });

   describe(".PlayTurn with away manager stamina 30 and player with attack of 2", function() {
       it("should result in a manager with stamina of 28", function(){
          validGame.WhosTurnIsIt = 0;
          modifiedGame = game.playTurn(validGame, 0, 1);
          modifiedGame.AwayTeam.Manager.should.have.property('Stamina', 28);
       });
   });

   describe(".PlayTurn with home manager stamina 1 and player with attack of 2", function() {
       it("should result in a manager with stamina of -1", function(){
          validGame.WhosTurnIsIt = 1;
          validGame.HomeTeam.Manager.Stamina = 1;
          modifiedGame = game.playTurn(validGame, 1, 1);
          modifiedGame.HomeTeam.Manager.should.have.property('Stamina', -1);
       });
   });

});
