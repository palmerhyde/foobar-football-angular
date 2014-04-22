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

function DeckContainsEffect(effect, deck) {
    var containsEffect = false;

    for (var i = 0; i < deck.length; i++) {
        if (deck[i].Effects != undefined) {
            for (var j = 0; j < deck[i].Effects.length; j++) {
                if (deck[i].Effects[j].Type == effect) {
                    return true;
                }
            }
        }
    }

    return containsEffect;
}

exports.findCardInDeck = FindCardInDeck;
exports.deckContainsEffect = DeckContainsEffect;