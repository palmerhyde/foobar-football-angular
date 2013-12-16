function ModelBaseCard(params) {
    var types = {
        0: 'Tactic',
        1: 'Player',
        2: 'Move',
        3: 'Stadium',
        4: 'Manager'
    };

    var styles = {
        0: 'generic',
        1: 'total',
        2: 'organised',
        3: 'counter',
        4: 'latin',
        5: 'physical'
    };

    this.cardType = types[params.CardType];
    this.id = params.Id;
    this.name = params.Name;
    this.pictureUrl = params.PictureUrl;
    this.rarity = params.Rarity;
    this.shortName = params.ShortName;
    this.description = params.Description;
    this.style = styles[params.CardStyle];
}