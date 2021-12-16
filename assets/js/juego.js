


let deck = [];
const tipos = ['C', 'D', 'H', 'S']; 

const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos){
            deck.push(i + tipo);

        }
        
    }

    console.log(deck);
} 


crearDeck();


