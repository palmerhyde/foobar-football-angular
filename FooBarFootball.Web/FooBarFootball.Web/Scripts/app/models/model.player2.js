function ModelPlayer2(params) {
    var position = {
        0: 'Goalkeeper',
        1: 'Defender',
        2: 'Midfielder',
        3: 'Attacker'
    };
    
    this.prototype = new ModelBaseCard(params);
    this.club = params.Club;
    this.nation = params.Nation;
    this.position = position[params.Position];
    this.attack = params.Attack;
    this.stamina = params.Stamina;
    this.cost = params.Cost;
}