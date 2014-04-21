function PlayEffects(card, game) {
    var Pressure = require('./effect_pressure');

    if (typeof card == 'undefined') {
    	throw new Error('card argument missing');
    }

    if (typeof game == 'undefined') {
    	throw new Error('game argument missing');
    }

    if (card.Effects) {
        for (var i=0; i < card.Effects.length; i++) {
            var effect = card.Effects[i].type;
            switch (effect) {
                case 'pressure':
                  Pressure.applyEffect(card);
                  break;
            }
        }
    }

    return game;
}

function InitialEffects(card, game) {
    var WarmUp = require('./effect_warmup');
    
    if (typeof card == 'undefined') {
        throw new Error('card argument missing');
    }

    if (typeof game == 'undefined') {
        throw new Error('game argument missing');
    }

    WarmUp.warmUpPlayer(card);
    return game;
}

exports.playEffects = PlayEffects;
exports.initalEffects = InitialEffects;