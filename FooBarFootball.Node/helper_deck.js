function FindCardInDeck(cardId, deck) {
    if (typeof cardId == 'undefined') {
    	throw new Error('cardId argument missing');
    }

    if (typeof deck == 'undefined') {
    	throw new Error('deck argument missing');
    }

    var card = deck.filter(function( obj ) {
        return obj.Id == cardId;
    });

    return card;
} 

exports.findCardInDeck = FindCardInDeck;