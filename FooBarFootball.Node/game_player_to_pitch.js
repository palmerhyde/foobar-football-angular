var playTurn = function playTurn(game, userId, cardId) {
    var ServiceFirebase = require('./service_firebase');
    var _ = require('underscore');
    var WarmUp = require('./effect_warmup');
    var Validate = require('./helper_validation.js');
    var DeckHelper = require('./helper_deck.js');
    var yourTeam;
            
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
    }

    if (game.AwayTeam.UserId  == userId) {
        yourTeam = game.AwayTeam;
    }

    var card = DeckHelper.findCardInDeck(cardId, yourTeam.Hand)

    if (card == null || card[0] == null)
    {
        throw new Error('card not in hand');
    }

    if (yourTeam.Mana < card[0].Cost)
    {
        throw new Error('not enough currency');
    }

    yourTeam.Pitch.push(card[0]);
    yourTeam.Hand = _.without(yourTeam.Hand, card[0]);
    yourTeam.Mana = yourTeam.Mana - card[0].Cost;
    WarmUp.warmUpPlayer(card[0]);
    return game;
    
}

exports.playTurn = playTurn;