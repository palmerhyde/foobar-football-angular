function ApplyEffect(effect, targetPlayer) {
    if (typeof effect == 'undefined') {
        throw new Error('missing effect parameter');
    }

    if (typeof targetPlayer == 'undefined') {
        throw new Error('missing targetPlayer parameter');
    }

    if (effect.Type != 'Restore Stamina') {
        throw new Error('invalid effect type');
    }

    // TODO: Check - is target player eligible for the buff?
    targetPlayer.Stamina += effect.Value;

    if (targetPlayer.Stamina > targetPlayer.OriginalStamina) {
        targetPlayer.Stamina = targetPlayer.OriginalStamina;
    }

    return targetPlayer;
}

exports.applyEffect = ApplyEffect;