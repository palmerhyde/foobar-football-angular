function ModelPlayer(params) {
    var position = {
        0: 'Goalkeeper',
        1: 'Defender',
        2: 'Midfielder',
        3: 'Attacker'
    };

    // TODO: add all attributes
    // TODO: can we make this array generic or part of the base class?
    var attribute = {
        0: 'Passing',
        1: 'Pace',
        2: 'Dribbling',
        3: 'Shooting',
        4: 'Defending',
        5: 'Heading',
        6: 'Diving',
        7: 'Handling',
        8: 'Kicking',
        9: 'Positioning',
        10: 'Reflexes',
        11: 'Speed'
    };

    var atts = {};
    for (var i = 0; i < params.PlayerAttributes.length; i++) {
        atts[attribute[params.PlayerAttributes[i].Attribute]] = params.PlayerAttributes[i].Value;
    }

    this.prototype = new ModelBaseCard(params);
    this.club = params.Club;
    this.nation = params.Nation;
    this.position = position[params.Position];
    this.attributes = atts;
}