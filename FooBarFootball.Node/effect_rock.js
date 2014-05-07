function ApplyEffect(game, effect) {
    var DeckHelper = require('./helper_deck.js');

    if (typeof game == 'undefined') {
        throw new Error('missing game parameter');
    }

    if (typeof effect == 'undefined') {
        throw new Error('missing effect parameter');
    }

    if (effect.Type != 'Rock') {
        throw new Error('Effect of type rock expected');
    }

    if (effect.TeamId == game.HomeTeam.Id)  {
        var card = DeckHelper.findCardInDeck(effect.Target, game.HomeTeam.Pitch);

        if (card == null || card[0] == null) {
            throw new Error('card not on pitch');
        }

        card[0].IsRock = true;
    }

    if (effect.TeamId == game.AwayTeam.Id)  {
        var card = DeckHelper.findCardInDeck(effect.Target, game.AwayTeam.Pitch);

        if (card == null || card[0] == null) {
            throw new Error('card not on pitch');
        }

        card[0].IsRock = true;
    }

    return game
}

exports.applyEffect = ApplyEffect;