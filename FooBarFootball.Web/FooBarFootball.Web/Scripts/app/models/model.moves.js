function ModelMove(params, attributes) {

    this.prototype = new ModelBaseCard(params);
    
    var attAtts = {};
    for (var i = 0; i < params.AttackingAttributes.length; i++) {
        attAtts[attributes[i]] = params.AttackingAttributes[i];
    }
    var defAtts = {};
    for (var i = 0; i < params.DefendingAttributes.length; i++) {
        defAtts[attributes[i]] = params.DefendingAttributes[i];
    }


    this.attackingAttributes = attAtts;
    this.attackingPosition = params.AttackingPosition;
    this.attackingSuccessCommentry = params.AttackingSuccessCommentry;
    this.counterFootballCost = params.CounterFootballCost;
    this.defendingAttributes = defAtts;
    this.defendingPosition = params.DefendingPosition;
    this.defendingSuccessCommentry = params.DefendingSuccessCommentry;
    this.description = params.Description;
    this.genericCost = params.GenericCost;
    this.latinFootballCost = params.LatinFootballCost;
    this.organisedFootballCost = params.OrganisedFootballCost;
    this.physicalFootballCost = params.PhysicalFootballCost;
    this.totalFootballCost = params.TotalFootballCost;
}

