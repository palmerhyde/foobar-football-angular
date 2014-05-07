var DeckHelper = require('./helper_deck.js');
var GameHelper = require('./helper_game.js');
var ValidationHelper = require('./helper_validation.js');

/*
 * This is documentation, we need to experiment on how to 
 * generate documentation
 */
function PlayEffects(game) {
    var Pressure = require('./effect_pressure');
    var Rock = require('./effect_rock');
    var RestoreStamina = require('./effect_restore_stamina');
    var DealDamage = require('./effect_deal_damage');

    if (typeof game == 'undefined') {
    	throw new Error('game argument missing');
    }

    // Put the effect on the games stack of effects.
    if (game.Effects) {
        for (var i=0; i < game.Effects.length; i++) {
            switch (game.Effects[i].Type) {
                case 'Pressure':
                  Pressure.applyEffect(game, game.Effects[i]);
                  break;
                case 'Rock':
                  Rock.applyEffect(game, game.Effects[i]);
                  break;
                case 'Restore Stamina':
                  RestoreStamina.applyEffect(game, game.Effects[i]);
                  break;
                case 'Deal Damage':
                    DealDamage.applyEffect(game, game.Effects[i]);
                    break;
            }
        }
    }

    return game;
}

/*
 * Place an effect on the games effect stack
 */
function AddEffectToGameEffectStack(game, effect, team, card) {
    if (typeof game == 'undefined') {
        throw new Error('game argument missing');
    }

    if (typeof effect == 'undefined') {
        throw new Error('effect argument missing');
    }

    if (typeof team == 'undefined') {
        throw new Error('team argument missing');
    }

    if (typeof card == 'undefined') {
        throw new Error('card argument missing');
    }

    if (typeof game.Effects == 'undefined') {
        game.Effects = [];
    }

    if (!ValidationHelper.validateEffect(effect)) {
        throw new Error('invalid effect');
    }

    effect.TeamId = team.Id;

    if (effect.Target == 'Self') {
        effect.Target = card.Id;
    }

    game.Effects.push(effect);
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


function UpdateEffects(game) {
    UpdateTargetablePlayers(game);
    UpdatePlayersWhoCanAttack(game);
    return game
}

function UpdateTargetablePlayers(game) {
    if (GameHelper.homeTeamHasRocks(game)) {
        for (var i = 0; i < game.HomeTeam.Pitch.length; i++) {
            if (game.HomeTeam.Pitch[i].IsRock) {
                game.HomeTeam.Pitch[i].IsTargetable = true;
            }
            else {
                game.HomeTeam.Pitch[i].IsTargetable = false;
            }
        }
    }

    if (GameHelper.awayTeamHasRocks(game)) {
        for (var i = 0; i < game.AwayTeam.Pitch.length; i++) {
            if (game.AwayTeam.Pitch[i].IsRock) {
                game.AwayTeam.Pitch[i].IsTargetable = true;
            }
            else {
                game.AwayTeam.Pitch[i].IsTargetable = false;
            }
        }
    }

    return game
}

function UpdatePlayersWhoCanAttack(game) {
    // foreach (var player in game.Pitch)
    //  if (player is not warming up || player is not marked)
    //    player.CanAttack = true
    //  else
    //    player.CanAttack = false

    return game;
}

exports.playEffects = PlayEffects;
exports.initalEffects = InitialEffects;
exports.updateEffects = UpdateEffects;
exports.addEffectToGameEffectStack = AddEffectToGameEffectStack;