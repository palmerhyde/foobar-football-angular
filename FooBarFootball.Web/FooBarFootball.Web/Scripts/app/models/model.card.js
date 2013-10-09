function ModelCard(params) {
    var types = {
        0: 'Tactic',
        1: 'Player',
        2: 'Move',
        3: 'Stadium',
        4: 'Manager'
    };

    this.id = params.Id;
    this.name = params.Name;
    this.shortName = params.ShortName;
    this.description = params.Description;
    this.cardType = types[params.CardType];
    this.rarity = params.Rarity;
    this.pictureUrl = "Content/images/" + types[params.CardType] +"/" + params.PictureUrl;
}