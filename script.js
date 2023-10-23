// Función para mezclar las respuestas
function mezclarRespuestas(respuesta, incorrecta1, incorrecta2) {
    const opciones = [respuesta, incorrecta1, incorrecta2];
    opciones.sort(() => Math.random() - 0.5); // Mezcla las respuestas al azar
    return opciones;
}

// Función para escoger una pregunta aleatoria y mostrarla
function escogerPreguntaAleatoria() {
    let basePreguntas = readText("ejercicios-basicos.json");
    let interpreteBP = JSON.parse(basePreguntas);
    
    const indiceAleatorio = Math.floor(Math.random() * interpreteBP.length);
    pregunta = interpreteBP[indiceAleatorio];
    
    select_id("categoria").innerHTML = pregunta.categoria;
    select_id("pregunta").getElementsByTagName("img")[0].src = pregunta.pregunta;
    
    // Mezclar las respuestas antes de mostrarlas
    const respuestasMezcladas = mezclarRespuestas(
        pregunta.respuesta,
        pregunta.incorrecta1,
        pregunta.incorrecta2
    );
    
    select_id("btn1").getElementsByTagName("img")[0].src = respuestasMezcladas[0];
    select_id("btn2").getElementsByTagName("img")[0].src = respuestasMezcladas[1];
    select_id("btn3").getElementsByTagName("img")[0].src = respuestasMezcladas[2];
}

// Función para verificar la respuesta seleccionada
function verificarRespuesta(elementoRespuesta) {
    const respuestaSeleccionada = elementoRespuesta.getElementsByTagName('img')[0].getAttribute('src');
    
    if (respuestaSeleccionada === pregunta.respuesta) {
        // Respuesta correcta
        alert("¡Respuesta correcta!");
        escogerPreguntaAleatoria(); // Mostrar la siguiente pregunta
    } else {
        // Respuesta incorrecta, puedes mostrar un mensaje de error
        alert("Respuesta incorrecta. Intenta de nuevo.");
    }
}

// Función para seleccionar un elemento por su ID
function select_id(id) {
    return document.getElementById(id);
}

// Función para leer un archivo de texto mediante una solicitud XMLHttpRequest
function readText(ruta_local) {
    var texto = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", ruta_local, false);
    xmlhttp.send();
    if (xmlhttp.status == 200){
        texto = xmlhttp.responseText;
    }
    return texto;
}

// Llama a la función para cargar la primera pregunta
escogerPreguntaAleatoria();
