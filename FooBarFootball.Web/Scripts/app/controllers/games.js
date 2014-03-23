fooBarControllers.controller('GamesController', ['$scope', '$http', '$firebase', function ($scope, $http, $firebase) {
    $scope.title = "FooBar Football - Games";

    // TODO: why is there a strongly coupled call to new Firebase when we have a $firebase instance passed by DI?
    // TODO: make a game service with 3 way binding
    var games = new Firebase("https://foobarfootball.firebaseio.com/Games");

    // TODO: replace 0 with user.id
    var user = new Firebase("https://foobarfootball.firebaseio.com/Users/0");
    var queues = new Firebase("https://foobarfootball.firebaseio.com/Queues/PlayPlayerCardFromHandToPitch");
    var queue_playerAttckPlayer = new Firebase("https://foobarfootball.firebaseio.com/Queues/PlayerAttackPlayer");
    var userObject;

    // TODO: get the gameview from firebase.
    user.on('value', function (snapshot) {
        // TODO: replace snapshot.name() with user.id
        userObject = snapshot.name();
        $scope.game = snapshot.val().GameView;
        $scope.$apply();
    });

    $scope.games = $firebase(games);
;

    $scope.createGame = function () {
        // Push your manager / fb id if you are not already playing a game
        var gameId = games.push({ Id: "0", Name: "Liam Molloy", State: "Waiting" });

        // push game id to the manager
        user.child('Game').set(gameId.toString());
        user.child('IsPlaying').set(true);
        $scope.isPlaying = true;
    };

    $scope.joinGame = function (game) {
        console.log(game)
    };

    // TODO: move this into firebase with a lookup id of "demo".
    $scope.resetGame = function () {
        var game = {
    "Id": "152879",
    "WhosTurnIsIt" : "0",
    "State" : "Playing",
    "HomeTeam": 
  {
      "UserId": "0",
      "TeamName": "Palmer Hyde FC",
      "Mana": "2",
      "Score": "0",
      "Deck": [],
      "Hand": [
      {
        "Id": "152879",
        "Name": "Mark Noble",
        "ShortName": "Noble",
        "CardType": "Player",
        "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/152879.png",
        "Cost": "1",
        "Attack": "2",
        "Stamina": "1",
        "Description": "Manager instructions: Give a player +2 attack this turn.",
        "Club": "http://fh13.fhcdn.com/static/img/14/clubs/19.png",
        "Nation": "http://fh13.fhcdn.com/static/img/nations/14.png",
        "Position": "Midfielder",
        "Effects": { "PlayerEffects": "Rock" },
        "PlayerDataUrl": "http://www.futhead.com/14/players/152879/"
    },
    {
        "Id": "51394",
        "Name": "Kevin Nolan",
        "ShortName": "Nolan",
        "CardType": "Player",
        "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/51394.png",
        "Cost": "1",
        "Attack": "1",
        "Stamina": "1",
        "Description": "Manager instructions: Deal 1 damage.",
        "Club": "http://fh13.fhcdn.com/static/img/14/clubs/19.png",
        "Nation": "http://fh13.fhcdn.com/static/img/nations/14.png",
        "Position": "Midfielder",
        "PlayerDataUrl": "http://www.futhead.com/14/players/51394/"
    },
    {
        "Id": "175092",
        "Name": "Maynor Figueroa",
        "ShortName": "Figueroa",
        "CardType": "Player",
        "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/175092.png",
        "Cost": "1",
        "Attack": "1",
        "Stamina": "2",
        "Description": "Rock",
        "Club": "http://fh13.fhcdn.com/static/img/14/clubs/1952.png",
        "Nation": "http://fh13.fhcdn.com/static/img/nations/81.png",
        "Position": "Defender",
        "PlayerDataUrl": "http://www.futhead.com/14/players/175092/"
    }
  ],
      "Pitch": []
  },
    "AwayTeam": 
  {
      "UserId": "1",
      "TeamName": "The Mighty Reds",
      "Mana": "1",
      "Score": "0",
      "Deck": [],
      "Hand": [],
      "Pitch": [
        {
            "Id": "184457",
            "Name": "Ricky van Wolfswinkel",
            "ShortName": "van Wolfswinkel",
            "CardType": "Player",
            "PictureUrl": "http://fh13.fhcdn.com/static/img/14/players/184457.png",
            "Cost": "1",
            "Attack": "1",
            "Stamina": "1",
            "Description": "Pressure",
            "Club": "http://fh13.fhcdn.com/static/img/14/clubs/1792.png",
            "Nation": "http://fh13.fhcdn.com/static/img/nations/34.png",
            "Position": "Attacker",
            "PlayerDataUrl": "http://www.futhead.com/14/players/184457/"
        }
      ]
  }
};
        games.child("test").set(game);
        console.log(game)
    };

    $scope.playPlayerCardFromHandToPitch = function (card) {
        var cardPlayed = queues.push({ GameId: 1, CardId: card.Id, UserId: userObject });
    };

    $scope.playerAttackPlayer = function (card) {
        var cardPlayed = queue_playerAttckPlayer.push({ GameId: "test", CardId: card.Id, TargetCardId: 184457, UserId: userObject });
    };
    
    setTimeout(function() {
    	$( ".draggable" ).draggable({ containment: "#game", scroll: false });
    }, 1000);
    
}]);