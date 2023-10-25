var opciones = [];
var datosJSON; // Declaración global para almacenar los datos JSON

document.addEventListener("DOMContentLoaded", function () {
  fetch('ejercicios-sustitucion.json')
    .then(response => response.json())
    .then(data => {
      datosJSON = data; // Almacenar los datos JSON

      var preguntaContainer = document.getElementById("pregunta");
      var opcionesRespuesta = document.getElementById("opcionesRespuesta");
      var cuadroRespuestas = document.getElementById("cuadroRespuestas");
      var texto = document.getElementById("texto");

      var currentArrayIndex = 0;
      var currentQuestionIndex = 0;

      function mostrarPregunta() {
        if (currentArrayIndex < datosJSON.length) {
          var pregunta = datosJSON[currentArrayIndex][currentQuestionIndex];
          preguntaContainer.querySelector("h2").textContent = pregunta.categoria;
          
          var imagenPregunta = preguntaContainer.querySelector(".imgPregunta");
          imagenPregunta.src = pregunta.pregunta;
          imagenPregunta.alt = "Pregunta";

          texto.textContent=pregunta.texto;

          opciones = [pregunta.respuesta, pregunta.incorrecta1, pregunta.incorrecta2];
          opciones = shuffle(opciones);

          opcionesRespuesta.innerHTML = '';
          opciones.forEach(function (opcion) {
            var botonRespuesta = document.createElement("button");
            var imagenOpcion = document.createElement("img");
            imagenOpcion.src = opcion;
            imagenOpcion.alt = "Opción de respuesta";
            // Modifica el tamaño de las imágenes
            imagenOpcion.style.width = "150px";
            imagenOpcion.style.height = "auto";
            botonRespuesta.appendChild(imagenOpcion);
            botonRespuesta.addEventListener("click", function () {
              verificarRespuesta(opcion);
            });
            opcionesRespuesta.appendChild(botonRespuesta);
          });
          // Agrega el ejercicio inicial al cuadro de respuestas al cargar un nuevo conjunto
          if (currentQuestionIndex === 0) {
            var imagenEjercicioInicial = document.createElement("img");
            imagenEjercicioInicial.src = pregunta.pregunta; // Usamos la imagen de la pregunta como ejercicio inicial
            // Modifica el tamaño de la imagen
            imagenEjercicioInicial.style.width = "150px";
            imagenEjercicioInicial.style.height = "auto";
            cuadroRespuestas.appendChild(imagenEjercicioInicial);
          }
          
        } else {
          alert("Has completado todas las preguntas.");
        }
      }

      function verificarRespuesta(respuestaUsuario) {
        if (currentArrayIndex < datosJSON.length) {
          var pregunta = datosJSON[currentArrayIndex][currentQuestionIndex];
      
          if (respuestaUsuario === pregunta.respuesta) {
            // Agrega el ejercicio al cuadro de respuestas correctas
            var imagenEjercicio = document.createElement("img");
            imagenEjercicio.src = pregunta.respuesta;
            imagenEjercicio.style.width="150px";
            imagenEjercicio.style.height="auto";
            cuadroRespuestas.appendChild(imagenEjercicio);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Excelente',
              showConfirmButton: false,
              timer: 1000
            });
      
            if (currentQuestionIndex === datosJSON[currentArrayIndex].length - 1) {
              cuadroRespuestas.innerHTML = ''; // Limpia el cuadro de respuestas antes de avanzar
              currentQuestionIndex++;
              if (currentQuestionIndex>0) {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Ejercicio Resuelto',
                  showConfirmButton: false,
                  timer: 2000
                })
              }
      
              if (currentQuestionIndex >= datosJSON[currentArrayIndex].length) {
                currentArrayIndex++;
                currentQuestionIndex = 0;
              }
      
              mostrarPregunta(); // Muestra la siguiente pregunta después de mostrar "Cambiando"
            } else {
              currentQuestionIndex++;
              opcionesRespuesta.innerHTML = ''; // Limpia las opciones de respuesta
              mostrarPregunta(); // Muestra la siguiente pregunta
            }
          } else {
            cuadroRespuestas.innerHTML = ''; // Limpiar el cuadro de respuestas
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'respuesta Incorrecta',
              showConfirmButton: false,
              timer: 1000
            })
            currentQuestionIndex = 0;
            mostrarPregunta(); // Vuelve al paso 1 del arreglo en caso de respuesta incorrecta
          }
        } else {
          alert("Has completado todas las preguntas.");
        }
      }
      
      
      

      
      
      

      function shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      mostrarPregunta();
    })
    .catch(error => console.error('Error al cargar los datos JSON:', error));
});
