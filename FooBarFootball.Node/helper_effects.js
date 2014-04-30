var DeckHelper = require('./helper_deck.js');

/*
 * This is documentation, we need to experiment on how to 
 * generate documentation
 */
function PlayEffects(card, game, targetCard) {
    var Pressure = require('./effect_pressure');
    var Rock = require('./effect_rock');
    var RestoreStamina = require('./effect_restore_stamina');

    if (typeof card == 'undefined') {
    	throw new Error('card argument missing');
    }

    if (typeof game == 'undefined') {
    	throw new Error('game argument missing');
    }

    if (card.Effects) {
        for (var i=0; i < card.Effects.length; i++) {
            var effect = card.Effects[i].Type;
            switch (effect) {
                case 'pressure':
                  Pressure.applyEffect(card);
                  break;
                case 'rock':
                  Rock.applyEffect(card, game);
                  break;
                case 'Restore Stamina':
                    RestoreStamina.applyEffect(card.Effects[i], targetCard);
                    break;
            }
        }
    }

    return game;
}

/*
 * Place a card into an inital state before effects are applied
 */
function InitialEffects(card, game) {
    var WarmUp = require('./effect_warmup');
    
    if (typeof card == 'undefined') {
        throw new Error('card argument missing');
    }

    if (typeof game == 'undefined') {
        throw new Error('game argument missing');
    }

    card.OriginalAttack = card.Attack;
    card.OriginalStamina = card.Stamina;
    WarmUp.warmUpPlayer(card);
    card.IsTargetable = true;
    card.CanAttack = true;
    return game;
}

function UpdateEffects(yourTeam) {
    UpdateTargetablePlayers(yourTeam);
    UpdatePlayersWhoCanAttack(yourTeam);
    return yourTeam
}

function UpdateEffects(yourTeam) {
    UpdateTargetablePlayers(yourTeam);
    UpdatePlayersWhoCanAttack(yourTeam);
    return yourTeam
}

function UpdateTargetablePlayers(yourTeam) {
    if (DeckHelper.deckContainsEffect("rock", yourTeam.Pitch)) {
        for (var i = 0; i < yourTeam.Pitch.length; i++) {
            if (yourTeam.Pitch[i].IsRock) {
                yourTeam.Pitch[i].IsTargetable = true;
            }
            else {
                yourTeam.Pitch[i].IsTargetable = false;
            }
        }
    }

    return yourTeam
}

function UpdatePlayersWhoCanAttack(yourTeam) {
    // foreach (var player in game.Pitch)
    //  if (player is not warming up || player is not marked)
    //    player.CanAttack = true
    //  else
    //    player.CanAttack = false

    return yourTeam;
}

exports.playEffects = PlayEffects;
exports.initalEffects = InitialEffects;
exports.updateEffects = UpdateEffects;