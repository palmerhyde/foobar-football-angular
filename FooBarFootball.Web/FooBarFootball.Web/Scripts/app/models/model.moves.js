function ModelMove(params) {

    this.prototype = new ModelBaseCard(params);

    this.attackingAttribute = params.AttackingAttribute;
    this.attackingPosition = params.AttackingPosition;
    this.attackingSuccessCommentry = params.AttackingSuccessCommentry;
    this.counterFootballCost = params.CounterFootballCost;
    this.defendingAttribute = params.DefendingAttribute;
    this.defendingPosition = params.DefendingPosition;
    this.defendingSuccessCommentry = params.DefendingSuccessCommentry;
    this.description = params.Description;
    this.genericCost = params.GenericCost;
    this.latinFootballCost = params.LatinFootballCost;
    this.organisedFootballCost = params.OrganisedFootballCost;
    this.physicalFootballCost = params.PhysicalFootballCost;
    this.totalFootballCost = params.TotalFootballCost;
}

