(() => {
    "use strict";

    let deck = [];
    const tipos = ["C", "D", "H", "S"];
    const especiales = ["A", "J", "Q", "K"];

    let puntosJugador = 0,
        puntosComputadora = 0;

    // Referencias de HTML
    const btnPedir = document.querySelector("#btnPedir");
    const btnDetener = document.querySelector("#btnDetener");
    const btnNuevo = document.querySelector("#btnNuevo");
    const marcador = document.querySelectorAll("small");
    const divCartasJugador = document.querySelector("#jugador-cartas");
    const divCartasComputadora = document.querySelector("#computadora-cartas");

    // Esta función crea un deck o set de barajas
    // ordenadas aleatoriamente.
    const crearDeck = () => {
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
        deck = _.shuffle(deck);
        return deck;
    };


    // Función que retira una carta del deck.
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw "No hay más cartas en el deck";
        }
        const carta = deck.pop();

        return carta;
    };

    // Función que extrae el valor de cada una de las cartas elegidas,
    // Tomando los caracteres numéricos del string.
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);

        // Si la carta no tiene números se asignará el valor según la letra,
        // A vale 11, el resto valen 10.
        return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
    };


    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        do {
            const carta = pedirCarta();
            puntosComputadora = puntosComputadora + valorCarta(carta);
            marcador[1].innerHTML = puntosComputadora;

            // Crea la imagen de las cartas y las agrega al tablero
            const imgCarta = document.createElement("img");
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add("carta");
            divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }
        } while (puntosComputadora < puntosMinimos && puntosMinimos < 21);

        // valida los puntos y lanza el mensaje del ganador, la función setTimeout corrige
        // el mensaje que se muestra antes que las cartas del juego.
        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert("¡Oh, parece que nadie gana");
            } else if (puntosMinimos > 21) {
                alert("¡Parace que has perdido, la máquina gana!");
            } else if (puntosComputadora > 21 || puntosJugador === 21) {
                alert("¡Felicidades, ganaste!");
            } else {
                alert("¡Wow, la computadora gana!");
            }
        }, 100);
    };

    // Eventos

    //Funciones del botón pedir
    btnPedir.addEventListener("click", () => {
        //Retira la carta del deck y hace la sumatoria en el marcador del jugador
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);
        marcador[0].innerHTML = puntosJugador;

        // Crea la imagen de las cartas y las agrega al tablero
        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        divCartasJugador.append(imgCarta);

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
        turnoComputadora(puntosJugador);
    });

    // Funciones del botón Nuevo juego que resetea los valores
    btnNuevo.addEventListener("click", () => {
        console.clear();

        deck = [];
        deck = crearDeck();
        puntosComputadora = 0;
        puntosJugador = 0;
        marcador[0].innerText = 0;
        marcador[1].innerText = 0;

        divCartasComputadora.innerHTML = "";
        divCartasJugador.innerHTML = "";

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    });
})();

