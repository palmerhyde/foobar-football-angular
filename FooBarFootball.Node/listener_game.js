var listen = function () {
    console.log('Listener: Game');
    
    var ServiceFirebase = require('./service_firebase');
    var Firebase = require('firebase');
    var Q = require('q');
    var _ = require('underscore');
    
    var reference = new Firebase('https://foobarfootball.firebaseio.com/Games');
    reference.on('child_changed', function (snapshot) {
        var game = snapshot.val()
        
        var user1Promise = ServiceFirebase.Find("Users", game.HomeTeam.UserId);
        var user2Promise = ServiceFirebase.Find("Users", game.AwayTeam.UserId);

        var all = Q.all([user1Promise, user2Promise]);

        all.then(function() {
            var user1 = user1Promise.valueOf();
            var user2 = user2Promise.valueOf();
            
            if (!user1 || !user2) {
                console.log('user not found');
            }

            game = SanitizeGame(game);

            user1.GameView = ConvertGameToGameViewHomeTeam(game, user1.Id);
            user2.GameView = ConvertGameToGameViewAwayTeam(game, user2.Id);

            ServiceFirebase.Set("Users", game.HomeTeam.UserId, user1);
            ServiceFirebase.Set("Users", game.AwayTeam.UserId, user2);
        });
    });
};

function ConvertGameToGameViewHomeTeam(game, userId) {
    var gameView = {
        Id: game.Id,
        IsYourTurn: game.WhosTurnIsIt == userId,
        Mana: game.HomeTeam.Mana,
        YourTeamName: game.HomeTeam.TeamName,
        YourTeamScore: game.HomeTeam.Score,
        YourTeamDeckCount: game.HomeTeam.Deck.length,
        YourTeamHand: game.HomeTeam.Hand,
        YourTeamPitch: game.HomeTeam.Pitch,
        YourTeamManager: game.HomeTeam.Manager,
        OppenentsTeamName: game.AwayTeam.TeamName,
        OppenentsTeamScore: game.AwayTeam.Score,
        OpponentsTeamDeckCount: game.AwayTeam.Deck.length,
        OpponentsTeamHandCount: game.AwayTeam.Hand.length,
        OpponentsTeamPitch: game.AwayTeam.Pitch,
        OpponentsTeamManager: game.AwayTeam.Manager
    };

    return gameView;
}

function ConvertGameToGameViewAwayTeam(game, userId) {
    var gameView = {
        Id: game.Id,
        IsYourTurn: game.WhosTurnIsIt == userId,
        Mana: game.AwayTeam.Mana,
        YourTeamName: game.AwayTeam.TeamName,
        YourTeamScore: game.AwayTeam.Score,
        YourTeamDeckCount: game.AwayTeam.Deck.length,
        YourTeamHand: game.AwayTeam.Hand,
        YourTeamPitch: game.AwayTeam.Pitch,
        YourTeamManager: game.AwayTeam.Manager,
        OppenentsTeamName: game.HomeTeam.TeamName,
        OppenentsTeamScore: game.HomeTeam.Score,
        OpponentsTeamDeckCount: game.HomeTeam.Deck.length,
        OpponentsTeamHandCount: game.HomeTeam.Hand.length,
        OpponentsTeamPitch: game.HomeTeam.Pitch,
        OpponentsTeamManager: game.HomeTeam.Manager
    };

    return gameView;
}

function SanitizeGame(game)
{
    if (!game.HomeTeam.Deck) {
        game.HomeTeam.Deck = [];
    }

    if (!game.HomeTeam.Hand) {
        game.HomeTeam.Hand = [];
    }

    if (!game.HomeTeam.Pitch) {
        game.HomeTeam.Pitch = [];
    }

    if (!game.AwayTeam.Deck) {
        game.AwayTeam.Deck = [];
    }

    if (!game.AwayTeam.Hand) {
        game.AwayTeam.Hand = [];
    }

    if (!game.AwayTeam.Pitch) {
        game.AwayTeam.Pitch = [];
    }

    return game;
}

exports.listen = listen;