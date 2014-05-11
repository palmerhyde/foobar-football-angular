function HomeTeamHasRocks(game) {
    if (typeof game == 'undefined') {
    	throw new Error('game argument missing');
    }

    if (typeof game.HomeTeam == 'undefined') {
    	throw new Error('HomeTeam argument missing');
    }

    if (typeof game.HomeTeam.Pitch == 'undefined') {
        throw new Error('Pitch argument missing');
    }

    var containsRock = false;

    for (var i = 0; i < game.HomeTeam.Pitch.length; i++) {
        if (game.HomeTeam.Pitch[i].IsRock) {
            containsRock = true;
            break;
        }
    }

    return containsRock;
}

function AwayTeamHasRocks(game) {
    if (typeof game == 'undefined') {
        throw new Error('game argument missing');
    }

    if (typeof game.AwayTeam == 'undefined') {
        throw new Error('AwayTeam argument missing');
    }

    if (typeof game.AwayTeam.Pitch == 'undefined') {
        throw new Error('Pitch argument missing');
    }

    var containsRock = false;

    for (var i = 0; i < game.AwayTeam.Pitch.length; i++) {
        if (game.AwayTeam.Pitch[i].IsRock) {
            containsRock = true;
            break;
        }
    }

    return containsRock;
}

function RemoveFatiguedPlayers(game) {
    if (typeof game == 'undefined') {
        throw new Error('game argument missing');
    }

    if (typeof game.HomeTeam == 'undefined') {
        throw new Error('HomeTeam argument missing');
    }

    if (typeof game.HomeTeam.Pitch == 'undefined') {
        throw new Error('Pitch argument missing');
    }

    if (typeof game.AwayTeam == 'undefined') {
        throw new Error('AwayTeam argument missing');
    }

    if (typeof game.AwayTeam.Pitch == 'undefined') {
        throw new Error('Pitch argument missing');
    }

    for (var i = game.HomeTeam.Pitch.length -1; i >=0; i--) {
        if (game.HomeTeam.Pitch[i].Stamina <= 0) {
            game.HomeTeam.Pitch.splice(i, 1)
        }
    }

    for (var i = game.AwayTeam.Pitch.length -1; i >=0; i--) {
        if (game.AwayTeam.Pitch[i].Stamina <= 0) {
            game.AwayTeam.Pitch.splice(i, 1)
        }
    }

    // Remove effects from the effects stack triggered by this player
}


exports.homeTeamHasRocks = HomeTeamHasRocks;
exports.awayTeamHasRocks = AwayTeamHasRocks;
exports.removeFatiguedPlayers = RemoveFatiguedPlayers;
// Remove effects from the effects stack triggered by this player