function WarmUpPlayers(players) {
    if (players) {
        for (var i=0; i < players.length; i++) {
            players[i].IsWarmingUp = false;
        }
    }
}

function WarmUpPlayer(player) {
    if(player) {
        player.IsWarmingUp = true;
    }
} 

exports.warmUpPlayers = WarmUpPlayers;
exports.warmUpPlayer = WarmUpPlayer;