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


exports.homeTeamHasRocks = HomeTeamHasRocks;
exports.awayTeamHasRocks = AwayTeamHasRocks;