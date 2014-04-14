var playTurn = function playTurn(game, userId) {
    if (typeof game == 'undefined') {
        throw new Error('missing game parameter');
    }

    if (typeof userId == 'undefined') {
        throw new Error('missing userId parameter');
    }

    if (!ValidateGame(game)) {
        throw new Error('not a valid game');
    }

    var yourTeam;
    var opponentsTeam;
    
    if (game.WhosTurnIsIt != userId) {
        throw new Error('its not your turn');
    }

    if (game.HomeTeam.UserId  == userId) {
        yourTeam = game.HomeTeam;
        yourTeam.Mana = 0;
        opponentsTeam = game.AwayTeam;
        opponentsTeam.Mana = game.Turn;
        DealCard(opponentsTeam.Deck, opponentsTeam.Hand);
        WarmUpPlayers(opponentsTeam.Pitch);
    }

    if (game.AwayTeam.UserId  == userId) {
        game.Turn = game.Turn + 1;
        yourTeam = game.AwayTeam;
        yourTeam.Mana = 0;
        opponentsTeam = game.HomeTeam;
        opponentsTeam.Mana = game.Turn;
        DealCard(opponentsTeam.Deck, opponentsTeam.Hand);
        WarmUpPlayers(opponentsTeam.Pitch);
    }

    game.WhosTurnIsIt = opponentsTeam.UserId;

    return game;
}

//TODO: move into a game helper class
//TODO: we need to think about undefined arrays and making them empty.
function ValidateGame(game) {
    if (
            typeof game == 'undefined' ||
            typeof game.WhosTurnIsIt == 'undefined' ||
            typeof game.HomeTeam == 'undefined' ||
            typeof game.HomeTeam.UserId == 'undefined' ||
            typeof game.HomeTeam.Mana == 'undefined' ||
            typeof game.AwayTeam == 'undefined' ||
            typeof game.AwayTeam.UserId == 'undefined' ||
            typeof game.AwayTeam.Mana == 'undefined'
        )
    {
        return false;
    }

    // Firebase does not store empty arrays so they will come back as undefined. We need to recreate them
    if (typeof game.HomeTeam.Deck == 'undefined') {
        game.HomeTeam.Deck = [];
    }

    if (typeof game.HomeTeam.Hand == 'undefined') {
        game.HomeTeam.Hand = [];
    }

    if (typeof game.HomeTeam.Pitch == 'undefined') {
        game.HomeTeam.Pitch = [];
    }

        if (typeof game.AwayTeam.Deck == 'undefined') {
        game.AwayTeam.Deck = [];
    }

    if (typeof game.AwayTeam.Hand == 'undefined') {
        game.AwayTeam.Hand = [];
    }

    if (typeof game.AwayTeam.Pitch == 'undefined') {
        game.AwayTeam.Pitch = [];
    }

    return true
}

// TODO: Move to shared module
function WarmUpPlayers(players) {
    if (players) {
        for (var i=0; i < players.length; i++) {
            players[i].IsWarmingUp = false;
        }
    }
}

function DealCard(deck, hand) {
    if (deck && deck.length > 0) {
        hand.push(deck[0]);
        deck.splice(0, 1);
    } 
}

exports.playTurn = playTurn;