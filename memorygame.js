document.addEventListener("DOMContentLoaded", () => {
    // captura el modo
    let modo = document.getElementById("miModo");
    
      // Cuando el usuario clica el cuadro de diálogo desaparece
      window.onclick = function (elemento) {
        if (elemento.target == modo) {
          modo.style.display = "none";
        }
        };

    // Opciones de las cartas
    const wizard = {
        name: "wizard",
        img: "./images/1wizard.svg"
    };
    const dwarf = {
        name: "dwarf",
        img: "./images/2dwarf.svg"
    };
    const elf = {
        name: "elf",
        img: "./images/3elf.svg"
    };
    const queen = {
        name: "queen",
        img: "./images/4queen.svg"
    };
    const prince = {
        name: "prince",
        img: "./images/5prince.svg"
    };
    const frogPrince = {
        name: "frogPrince",
        img: "./images/6fprince.svg"
    };
    const fairy = {
        name: "fairy",
        img: "./images/7fairy.svg"
    };
    const unicorn = {
        name: "unicorn",
        img: "./images/8unicorn.svg"
    };

    // Array de las imagenes para las cartas 
    const arrayCartas = [
        wizard,
        dwarf,
        elf,
        queen,
        prince,
        frogPrince,
        fairy,
        unicorn,
        wizard,
        dwarf,
        elf,
        queen,
        prince,
        frogPrince,
        fairy,
        unicorn,
    ];

    // Función que ordena las cartas aleatoriamente
    function ordenaCartas() {
        arrayCartas.sort(() => 0.5 - Math.random());
    }

    ordenaCartas();

    const cuadricula = document.querySelector(".cuadricula");
    const verResultado = document.querySelector("#resultado");

    let cartasElegidas = [];
    let cartasElegidasId = [];
    const cartasGanadas = [];

    // temporizador
    let tempo = 0;
    setInterval(() => {
        tempo++;
        console.log(tempo);
        document.querySelector("#tempo").textContent = tempo;
    }, 1000);

    // contador
    let contador = 0;
    document.querySelector("#contador").textContent = contador;

    // Cear el tablero con las cartas aleatorias
    function crearTablero() {
        for (let i = 0; i < arrayCartas.length; i++) {
            let carta = document.createElement("img");
            carta.setAttribute("src", "./images/colors.svg");
            carta.setAttribute("data-id", i); 
            carta.classList.add("miestilo");
            carta.addEventListener("click", girarCarta);
            cuadricula.appendChild(carta);
        }
    }
    // Comprueba si coinciden las cartas que el usuario ha dado la vuelta 
    function coincidencia() {
        let cartas = document.querySelectorAll("img");
        const opcion1 = cartasElegidasId[0];
        const opcion2 = cartasElegidasId[1];
        let carta1 = cartas[opcion1];
        let carta2 = cartas[opcion2];

        // Si clicas 2 veces seguidas en la misma carta
        if (carta1 == carta2) {
            carta1.setAttribute("src", "./images/colors.svg"); // pone imagen del reverso como si hubiera girado
            carta2.setAttribute("src", "./images/colors.svg");
            carta1.classList.add("miestilo"); // aplica estilos 
            carta2.classList.add("miestilo");
            alert("Has elegido la misma carta!");
        // Si las dos cartas elegidas son iguales
        } else if (cartasElegidas[0] === cartasElegidas[1]) {

            carta1.setAttribute("src", "./images/white.svg"); // cambia a blanco (como si hubiera desaparecido)
            carta2.setAttribute("src", "./images/white.svg");
            carta1.removeEventListener("click", girarCarta); // Deja de dar la opción de girar la carta
            carta2.removeEventListener("click", girarCarta);
            carta1.classList.add("miestilo"); // aplica estilos
            carta2.classList.add("miestilo");
            carta1.style.border = "3px solid black"
            carta2.style.border = "3px solid black"
            cartasGanadas.push(cartasElegidas);
        // Si las dos cartas elegidas son diferentes
        } else {
            setTimeout(() => {

                carta1.setAttribute("src", "./images/colors.svg"); 
                carta2.setAttribute("src", "./images/colors.svg");
                carta1.classList.add("miestilo");
                carta2.classList.add("miestilo");
            }, 500);
        }

        cartasElegidas = [];
        cartasElegidasId = [];

        verResultado.textContent = cartasGanadas.length;
        if (cartasGanadas.length === arrayCartas.length / 2) {
            //la alerta aparece
            document.getElementById("alerta").style.display = "block"
        }
    }
    
    // Con esta función se gira la carta
    function girarCarta() {
        
        let cartaId = this.getAttribute("data-id");
        cartasElegidas.push(arrayCartas[cartaId].name);
        cartasElegidasId.push(cartaId);
        this.setAttribute("src", arrayCartas[cartaId].img);
        contador++;
        document.querySelector("#contador").textContent = contador;
        if (cartasElegidas.length === 2) {
        setTimeout(coincidencia, 500);
        }
    }

    crearTablero();

    document.getElementById("miboton").addEventListener("click", () => {
        window.location.reload()
    })

});


