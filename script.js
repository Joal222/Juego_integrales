const mostrarDerivadas = document.getElementById("mostrar-derivadas");
const imagenContainerDerivadas = document.getElementById("imagen-container-derivadas");
const cerrarImagenDerivadas = document.getElementById("cerrar-imagen-derivadas");

mostrarDerivadas.addEventListener("click", function(event) {
    event.preventDefault();
    fondoNegro.style.display = "block";
    imagenContainerDerivadas.style.display = "block";
});

cerrarImagenDerivadas.addEventListener("click", function(event) {
    event.preventDefault();
    fondoNegro.style.display = "none";
    imagenContainerDerivadas.style.display = "none";
});

// Obtén referencias a los elementos del DOM
const mostrarImagen = document.getElementById("mostrar-imagen");
const fondoNegro = document.getElementById("fondo-negro");
const imagenContainer = document.getElementById("imagen-container");
const cerrarImagen = document.getElementById("cerrar-imagen");

// Agrega un manejador de eventos para mostrar la imagen cuando se hace clic en "mostrar-imagen"
mostrarImagen.addEventListener("click", function(event) {
    event.preventDefault();
    fondoNegro.style.display = "block";
    imagenContainer.style.display = "block";
});

// Agrega un manejador de eventos para cerrar la imagen cuando se hace clic en "cerrar-imagen"
cerrarImagen.addEventListener("click", function(event) {
    event.preventDefault();
    fondoNegro.style.display = "none";
    imagenContainer.style.display = "none";
});
