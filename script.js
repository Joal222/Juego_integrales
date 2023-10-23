var opciones = [];

        document.addEventListener("DOMContentLoaded", function() {
            fetch('ejercicios-basicos.json')
                .then(response => response.json())
                .then(data => {
                    // Datos JSON cargados con éxito
                    var datosJSON = data;

                    // Obtén una referencia a los elementos en HTML
                    var preguntaContainer = document.getElementById("pregunta");
                    var opcionesRespuesta = document.getElementById("opcionesRespuesta");

                    // Variables para el seguimiento de preguntas y arreglos
                    var currentArrayIndex = 0;
                    var currentQuestionIndex = 0;

                    // Función para mostrar una pregunta
                    function mostrarPregunta() {
                        var pregunta = datosJSON[currentArrayIndex][currentQuestionIndex];
                        preguntaContainer.querySelector("h2").textContent = pregunta.categoria;
                    
                        var imagenPregunta = preguntaContainer.querySelector("img");
                        imagenPregunta.src = pregunta.pregunta;
                        imagenPregunta.alt = "Pregunta";
                    
                        // Almacena las opciones de respuesta en la variable global
                        opciones = [pregunta.respuesta, pregunta.incorrecta1, pregunta.incorrecta2];
                        opciones = shuffle(opciones);
                    
                        opcionesRespuesta.innerHTML = '';
                        opciones.forEach(function(opcion) {
                            var botonRespuesta = document.createElement("button");
                            var imagenOpcion = document.createElement("img");
                            imagenOpcion.src = opcion;
                            imagenOpcion.alt = "Opción de respuesta";
                            botonRespuesta.appendChild(imagenOpcion);
                            botonRespuesta.addEventListener("click", function() {
                                verificarRespuesta(opcion);
                            });
                            opcionesRespuesta.appendChild(botonRespuesta);
                        });
                    }
                    

                    // Función para verificar la respuesta
                    function verificarRespuesta(respuestaUsuario) {
                        var pregunta = datosJSON[currentArrayIndex][currentQuestionIndex];
                        var cuadroRespuestas = document.getElementById("cuadroRespuestas");
                    
                        if (respuestaUsuario === pregunta.respuesta) {
                           
                            
                            if (currentQuestionIndex === datosJSON[currentArrayIndex].length - 1) {
                                cuadroRespuestas.innerHTML = ''; // Borra el cuadro de respuestas al finalizar el conjunto
                            }
                    
                            // Agrega el ejercicio al cuadro de respuestas correctas
                            var imagenEjercicio = document.createElement("img");
                            imagenEjercicio.src = pregunta.pregunta;
                            cuadroRespuestas.appendChild(imagenEjercicio);
                            
                            currentQuestionIndex++;
                            
                            if (currentQuestionIndex >= datosJSON[currentArrayIndex].length) {
                                currentArrayIndex++;
                                currentQuestionIndex = 0;
                            }
                            
                            if (currentArrayIndex < datosJSON.length) {
                                mostrarPregunta();
                            } else {
                                alert("Has completado todas las preguntas.");
                            }
                        } else {
                            alert("Respuesta incorrecta. Inténtalo de nuevo.");
                        }
                    }
                    

                    // Función para barajar las opciones de respuesta
                    function shuffle(array) {
                        for (var i = array.length - 1; i > 0; i--) {
                            var j = Math.floor(Math.random() * (i + 1));
                            [array[i], array[j]] = [array[j], array[i]];
                        }
                        return array;
                    }

                    // Inicializar mostrando la primera pregunta
                    mostrarPregunta();
                })
                .catch(error => console.error('Error al cargar los datos JSON:', error));
        });