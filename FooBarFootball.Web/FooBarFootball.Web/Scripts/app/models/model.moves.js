function ModelMove(params) {
    this.prototype = new ModelBaseCard(params);
    this.cost = params.Cost;
}