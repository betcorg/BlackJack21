const miModulo = (() => {
    "use strict";

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];


    // Referencias de HTML
    const btnPedir = document.querySelector("#btnPedir"),
        btnDetener = document.querySelector("#btnDetener"),
        btnNuevo = document.querySelector("#btnNuevo");

    const marcador = document.querySelectorAll("small"),
        divCartasJugadores = document.querySelectorAll(".divCartas");


    // Iinicializa el juego
    const inicJuego = (numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        marcador.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerText = "");

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }


    // Esta función crea un deck o set de barajas
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }

        // Con la función importada shuffle las cartas del deck
        // se ordenan de manera aleatoria.
        return _.shuffle(deck);
    };


    // Función que retira una carta del deck.
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw "No hay más cartas en el deck";
        }
        return deck.pop();
    };


    // Función que extrae el valor de cada una de las cartas elegidas,
    // Tomando los caracteres numéricos del string.
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);

        // Si la carta no tiene números se asignará el valor según la letra,
        // A vale 11, el resto valen 10.
        return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
    };


    // Turno: 0 = Primer jugados, la máquina será el último
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        marcador[turno].innerHTML = puntosJugadores[turno];
        return puntosJugadores[turno];

    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        divCartasJugadores[turno].append(imgCarta);
    }

    const ganador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert("¡Oh, parece que nadie gana");
            } else if (puntosMinimos > 21) {
                alert("¡Parace que has perdido, la máquina gana!");
            } else if (puntosComputadora > 21 || puntosJugadores === 21) {
                alert("¡Felicidades, ganaste!");
            } else {
                alert("¡Wow, la computadora gana!");
            }
        }, 100);
    }


    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        ganador();

    };


    // Eventos

    //Funciones del botón pedir
    btnPedir.addEventListener("click", () => {
        //Retira la carta del deck y hace la sumatoria en el marcador del jugador
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        //Valida el puntaje y desactiva el botón pedir
        if (puntosJugador > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    // Funciones del botón detener
    btnDetener.addEventListener("click", () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    // Funciones del botón Nuevo juego que resetea los valores
    btnNuevo.addEventListener("click", () => {

        inicJuego();

    });

    return {
        nuevoJuego: inicJuego

    }

})();

