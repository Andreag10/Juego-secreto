let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

// Esta función inicializa el juego y establece el número secreto
function condicionesIniciales() {
    asignarTextoElemento("h1", "Juego del número secreto!");
    asignarTextoElemento("p", `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumerosSecretos();
    intentos = 1;
}

// Función para mostrar mensajes en los elementos HTML
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

// Función para verificar si el usuario acertó el número secreto
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento("p", `¡Acertaste el número en ${intentos} ${(intentos === 1) ? "vez" : "veces"}!`);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        // El usuario no acertó
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento("p", "El número secreto es menor.");
        } else {
            asignarTextoElemento("p", "El número secreto es mayor.");
        }
        intentos++;
        limpiarCaja();
    }
}

// Función para limpiar el valor del input del usuario
function limpiarCaja() {
    document.querySelector("#valorUsuario").value = "";
}

// Función para generar números secretos únicos
function generarNumerosSecretos() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    // Si ya se sortearon todos los números posibles
    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles.');
    } else {
        // Si el número generado está incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumerosSecretos();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Limpiar caja de entrada
    limpiarCaja();
    // Condiciones iniciales para iniciar un nuevo juego
    condicionesIniciales();
    // Deshabilitar el botón de reiniciar
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

// Llamar a las condiciones iniciales para comenzar el juego
condicionesIniciales();