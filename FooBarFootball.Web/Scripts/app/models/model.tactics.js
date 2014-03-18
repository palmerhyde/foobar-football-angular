function ModelTactic(params) {

    this.prototype = new ModelBaseCard(params);
    this.description = params.Description;
    this.genericCost = params.GenericCost;
    this.latinFootballCost = params.LatinFootballCost;
    this.organisedFootballCost = params.OrganisedFootballCost;
    this.physicalFootballCost = params.PhysicalFootballCost;
    this.totalFootballCost = params.TotalFootballCost;
}

