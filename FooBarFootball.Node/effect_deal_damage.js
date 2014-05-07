function ApplyEffect(game, effect) {
    var DeckHelper = require('./helper_deck.js');

    if (typeof game == 'undefined') {
        throw new Error('missing game parameter');
    }

    if (typeof effect == 'undefined') {
        throw new Error('missing effect parameter');
    }

    if (effect.Type != 'Deal Damage') {
        throw new Error('invalid effect type');
    }

    if (typeof effect.Value == 'undefined') {
        throw new Error('effect must have a value');
    }

    if (effect.TeamId == game.HomeTeam.Id)  {
        var card = DeckHelper.findCardInDeck(effect.Target, game.HomeTeam.Pitch);

        if (card == null || card[0] == null) {
            throw new Error('card not on pitch');
        }

        DealDamage(card[0], effect.Value);
    }

    if (effect.TeamId == game.AwayTeam.Id)  {
        var card = DeckHelper.findCardInDeck(effect.Target, game.AwayTeam.Pitch);

        if (card == null || card[0] == null) {
            throw new Error('card not on pitch');
        }

        DealDamage(card[0], effect.Value);
    }

    return game;
}

function DealDamage(card, value) {
    // TODO: Check - is target player eligible for the buff?
    card.Stamina -= value;
}

exports.applyEffect = ApplyEffect;