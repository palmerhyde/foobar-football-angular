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

    this.prototype = new ModelBaseCard(params);
    this.club = params.Club;
    this.nation = params.Nation;
    this.position = position[params.Position];
    this.attributes = atts;
    this.total = total;
}