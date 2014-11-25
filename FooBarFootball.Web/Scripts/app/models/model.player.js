function ModelPlayer(params, attributes) {
    var position = {
        0: 'Goalkeeper',
        1: 'Defender',
        2: 'Midfielder',
        3: 'Attacker'
    };
    var total = 0;
    var atts = {};
    for (var i = 0; i < params.PlayerAttributes.length; i++) {
        if (attributes[params.PlayerAttributes[i].Attribute] == 'Unknown') {
            total = params.PlayerAttributes[i].Value;
        } else {
            atts[attributes[params.PlayerAttributes[i].Attribute]] = params.PlayerAttributes[i].Value;
        }
    }

    var st = {};
    for (var i = 0; i < params.Strengths.length; i++) {
        if (attributes[params.Strengths[i].Attribute] == 'Unknown') {
            total = params.Strengths[i].Value;
        } else {
            st[attributes[params.Strengths[i].Attribute]] = params.Strengths[i].Value;
        }
    }

    var wk = {};
    for (var i = 0; i < params.Weaknesses.length; i++) {
        if (attributes[params.Weaknesses[i].Attribute] == 'Unknown') {
            total = params.Weaknesses[i].Value;
        } else {
            wk[attributes[params.Weaknesses[i].Attribute]] = params.Weaknesses[i].Value;
        }
    }

    this.prototype = new ModelBaseCard(params);
    this.club = params.Club;
    this.nation = params.Nation;
    this.position = position[params.Position];
    this.attributes = atts;
    this.strengths = st;
    this.weaknesses = wk;
    this.total = total;
    this.attackingRating = params.AttackingRating;
    this.defensiveRating = params.DefensiveRating;
    this.overallRating = params.OverallRating;
}