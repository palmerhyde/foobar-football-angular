var playTurn = function playTurn(game, userId, cardId, targetCardId) {
    var _ = require('underscore');
    var WarmUp = require('./effect_warmup');
    var Validate = require('./helper_validation.js');
    var DeckHelper = require('./helper_deck.js');
    var EffectsHelper = require('./helper_effects.js');
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

    if (typeof targetCardId == 'undefined') {
        throw new Error('missing targetCardId parameter');
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

    var card = DeckHelper.findCardInDeck(cardId, yourTeam.Pitch);
    var targetCard = DeckHelper.findCardInDeck(targetCardId, opponentsTeam.Pitch);

    if (card == null || card[0] == null)
    {
        throw new Error('card not on pitch');
    }

    if (targetCard == null || targetCard[0] == null)
    {
        throw new Error('target card not on pitch');
    }

        if (!targetCard[0].IsTargetable)
    {
        throw new Error('target card is not targetable');
    }

    if (!card[0].CanAttack)
    {
        throw new Error('card cannot attack');
    }

    // play the move;
    card[0].Stamina = card[0].Stamina - targetCard[0].Attack;
    targetCard[0].Stamina = targetCard[0].Stamina - card[0].Attack;

    if (card[0].Stamina <= 0) {
        yourTeam.Pitch = _.without(yourTeam.Pitch, card[0]);
        // TODO: move to discard pile.
    }

    if (targetCard[0].Stamina <= 0) {
        opponentsTeam.Pitch = _.without(opponentsTeam.Pitch, targetCard[0]);
        // TODO: move to discard pile.
    }

    // Move warmup to Effects Helper
    WarmUp.warmUpPlayer(card[0]);
    EffectsHelper.updateEffects(yourTeam);

    return game;
}


exports.playTurn = playTurn;