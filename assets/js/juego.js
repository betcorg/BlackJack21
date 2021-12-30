



let deck         = [];
const tipos      = ['C', 'D', 'H', 'S']; 
const especiales = ['A', 'J', 'Q', 'K'];


// Referencias de HTML
const btnPedir = document.querySelector('#btnPedir');


// Esta función crea un deck o set de barajas
// ordenadas aleatoriamente.
const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos){
            deck.push(i + tipo);
        }   
    }

    for (let tipo of tipos) {
        for (let esp of especiales){
            deck.push(esp + tipo);
        }
    }
    // Con la función importada shuffle las cartas del deck
    // se ordenan de manera aleatoria.
    deck = _.shuffle(deck);
    console.log(deck);

    return deck;
} 

crearDeck();

// Función que retira una carta del deck.
const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay más cartas en el deck';
    }
    const carta = deck.pop();

    return carta;

}


// Función que extrae el valor de cada una de las cartas elegidas,
// Tomando los caracteres numéricos del string.
const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length -1);

    // Si la carta no tiene números se asignará el valor según la letra,
    // A vale 11, el resto valen 10.
    return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
}


// Eventos
btnPedir.addEventListener('click', () => {

})


