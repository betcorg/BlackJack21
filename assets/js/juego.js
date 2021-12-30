



let deck         = [];
const tipos      = ['C', 'D', 'H', 'S']; 
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
    puntosComputadora = 0;
    


// Referencias de HTML
const btnPedir = document.querySelector('#btnPedir');
const marcador = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');


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

//Funciones del botón pedir
btnPedir.addEventListener('click', () => {

    //Retira la carta del deck y hace la sumatoria en el marcador del jugador
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    marcador[0].innerHTML = puntosJugador;
    
    // Crea la imagen de las cartas y las agrega al tablero
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    //Valida el puntaje y desactiva el botón pedir
    if (puntosJugador > 21 ) {
        console.warn('Lo siento, perdiste');
        btnPedir.disabled = true;
    } else if (puntosJugador === 21) {
        console.warn('¡Genial, tienes 21 puntos!');
        btnPedir.disabled = true;
    }


    
})

