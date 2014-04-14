var playTurn = function playTurn(game, userId, cardId) {
    var WarmUp = require('./effect_warmup');
    var Validate = require('./helper_validation.js');
    var DeckHelper = require('./helper_deck.js');

    var yourTeam;
    var opponentsTeam;
    
    if (typeof game == 'undefined') {
        throw new Error('missing game parameter');
    }

    if (typeof userId == 'undefined') {
        throw new Error('missing userId parameter');
    }

    if (typeof cardId == 'undefined') {
        throw new Error('missing cardId parameter');
    }

    if (!Validate.validateGame(game)) {
        throw new Error('not a valid game');
    }

    if (game.WhosTurnIsIt != userId) {
        throw new Error('its not your turn');
    }

    if (game.HomeTeam.UserId  == userId) {
        yourTeam = game.HomeTeam;
        opponentsTeam = game.AwayTeam;
    }

    if (game.AwayTeam.UserId  == userId) {
        yourTeam = game.AwayTeam;
        opponentsTeam = game.HomeTeam;
    }

    if (!Validate.validateManager(opponentsTeam.Manager)) {
        throw new Error('not a valid manager');
    }

    var card = DeckHelper.findCardInDeck(cardId, yourTeam.Pitch);

    if (card == null || card[0] == null)
    {
        throw new Error('card not on pitch');
    }

    // play the move;
    opponentsTeam.Manager.Stamina = opponentsTeam.Manager.Stamina - card[0].Attack;

    WarmUp.warmUpPlayer(card[0]);
    return game
}

exports.playTurn = playTurn;