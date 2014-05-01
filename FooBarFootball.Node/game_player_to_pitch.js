var playTurn = function playTurn(game, userId, cardId, targetCardId) {
    var ServiceFirebase = require('./service_firebase');
    var _ = require('underscore');
    var Validate = require('./helper_validation.js');
    var DeckHelper = require('./helper_deck.js');
    var EffectsHelper = require('./helper_effects.js');
    var yourTeam;

    // TODO: we need to accept a target card or a list of target cards

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

    var targetCard = [];

    if (targetCardId != 'undefined' && targetCardId >0) {
        targetCard = DeckHelper.findCardInDeck(targetCardId, yourTeam.Pitch)
    }

    if (yourTeam.Mana < card[0].Cost)
    {
        throw new Error('not enough currency');
    }

    // Place a player in an inital on pitch state.
    // TODO: move into a playerHelper module, this is not related to effects
    EffectsHelper.initalEffects(card[0], game);

    // Put any effects the player has on the games effects stack.
    var gameAfterEffects = EffectsHelper.playEffects(card[0], game, targetCard[0]);

    // TODO: Move this into a deckHelper / gameHelper module
    yourTeam.Pitch.push(card[0]);
    yourTeam.Hand = _.without(yourTeam.Hand, card[0]);
    yourTeam.Mana = yourTeam.Mana - card[0].Cost;
    EffectsHelper.updateEffects(yourTeam);
    return gameAfterEffects;
}

exports.playTurn = playTurn;