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
    //this.position = params.Position.Name;
    this.attack = params.Attack;
    this.stamina = params.Defense;
    this.cost = params.Cost;
}