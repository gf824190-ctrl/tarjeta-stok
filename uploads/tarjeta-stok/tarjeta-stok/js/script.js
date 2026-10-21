"use strict";

/*
    Esperamos hasta que el navegador termine
    de cargar el contenido HTML.
*/
document.addEventListener("DOMContentLoaded", iniciarPagina);


/*
    Esta función ejecuta las funciones iniciales
    de la tarjeta digital.
*/
function iniciarPagina() {
    actualizarSaludo();
    actualizarAnio();

    console.log("La tarjeta digital de Stok se cargó correctamente.");
}


/*
    Cambia el saludo dependiendo de la hora
    configurada en el teléfono o computador.
*/
function actualizarSaludo() {
    const elementoSaludo = document.querySelector("#greeting");
    const horaActual = new Date().getHours();

    let saludo;

    if (horaActual >= 5 && horaActual < 12) {
        saludo = "Buenos días";
    } else if (horaActual >= 12 && horaActual < 20) {
        saludo = "Buenas tardes";
    } else {
        saludo = "Buenas noches";
    }

    elementoSaludo.textContent = saludo;
}


/*
    Obtiene automáticamente el año actual.
*/
function actualizarAnio() {
    const elementoAnio = document.querySelector("#current-year");
    const anioActual = new Date().getFullYear();

    elementoAnio.textContent = anioActual;
}