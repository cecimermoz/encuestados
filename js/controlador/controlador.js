/*
 * Controlador
 */
var Controlador = function(modelo) {
    this.modelo = modelo;
};

Controlador.prototype = {
    agregarPregunta: function(pregunta, respuestas) {
        this.modelo.agregarPregunta(pregunta, respuestas);
    },
    borrarPregunta: function(id) {
        this.modelo.borrarPregunta(id);
    },
    editarPregunta: function(id, nombre, respuestas) {
        this.modelo.editarPregunta(id, nombre, respuestas);
    },
    borrarTodo: function() {
        this.modelo.borrarTodo();
    },
    agregarVoto: function(id, respuestaSeleccionada) {
        this.modelo.agregarVoto(id, respuestaSeleccionada);
    }
};