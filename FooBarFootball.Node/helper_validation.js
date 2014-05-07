function ValidateGame(game) {
    if (
            typeof game == 'undefined' ||
            typeof game.WhosTurnIsIt == 'undefined' ||
            typeof game.HomeTeam == 'undefined' ||
            typeof game.HomeTeam.UserId == 'undefined' ||
            typeof game.HomeTeam.Mana == 'undefined' ||
            typeof game.HomeTeam.Manager == 'undefined' ||
            typeof game.AwayTeam == 'undefined' ||
            typeof game.AwayTeam.UserId == 'undefined' ||
            typeof game.AwayTeam.Mana == 'undefined' ||
            typeof game.AwayTeam.Manager == 'undefined'
        )
    {
        return false;
    }

    // Firebase does not store empty arrays so they will come back as undefined. We need to recreate them
    if (typeof game.Effects == 'undefined') {
        game.Effects = [];
    }

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

function ValidateManager(manager) {
    if (
            typeof manager == 'undefined' ||
            typeof manager.Id == 'undefined' ||
            typeof manager.Cost == 'undefined' ||
            typeof manager.Stamina == 'undefined' ||
            typeof manager.CardType == 'undefined'
        )
    {
        return false;
    }

    if (manager.CardType != "Manager") {
        return false;
    }

    return true
}

function ValidateEffect(effect) {
    if (
        typeof effect == 'undefined' ||
        typeof effect.Type == 'undefined'
        )
    {
        return false;
    }

    return true
}


exports.validateGame = ValidateGame;
exports.validateManager = ValidateManager;
exports.validateEffect = ValidateEffect;