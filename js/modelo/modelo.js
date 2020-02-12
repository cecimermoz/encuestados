/*
 * Modelo
 */
var Modelo = function() {
    this.preguntas = [];
    this.preguntasGuardadas = "";
    this.ultimoId = 0;

    //inicializacion de eventos
    this.preguntaAgregada = new Evento(this);
    this.preguntaEliminada = new Evento(this);
    this.preguntaEditada = new Evento(this);
    this.todasEliminadas = new Evento(this);
    this.votoAgregado = new Evento(this);

};

Modelo.prototype = {
    //se obtiene el id más grande asignado a una pregunta
    obtenerUltimoId: function() {
        if (this.preguntas.length > 0) {
            return this.preguntas[this.preguntas.length - 1].id
        } else {
            return 0;
        }

    },


    //se agrega una pregunta dado un nombre y sus respuestas
    agregarPregunta: function(nombre, respuestas) {
        var id = this.obtenerUltimoId();
        id++;
        var nuevaPregunta = { 'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas };
        this.preguntas.push(nuevaPregunta);
        this.guardar();
        this.preguntaAgregada.notificar();
    },
    borrarPregunta: function(id) {
        this.preguntas = this.preguntas.filter(a => a.id !== id);
        this.guardar();
        this.preguntaEliminada.notificar();
    },
    // Primero agarrar la que quiero, luego usar lo de agregar pregunta
    editarPregunta: function(id, nombre, respuestas) {
        var a = this.preguntas.find(a => a.id == id);
        a.textoPregunta = nombre;
        a.cantidadPorRespuesta = respuestas;
        this.guardar();
        this.preguntaEditada.notificar();
    },
    borrarTodo: function() {
        this.preguntas = [];
        this.guardar();
        this.todasEliminadas.notificar();
    },

    //se guardan las preguntas
    guardar: function() {
        this.preguntasGuardadas = localStorage.setItem("preguntas", JSON.stringify(this.preguntas));
    },

    recupero: function() {
        var recuperadas = localStorage.getItem("preguntas");
        this.preguntas = JSON.parse(recuperadas) || [];

    },
    agregarVoto: function(id, respuestaSeleccionada) {
        var a = this.preguntas.find(a => a.id == id);
        var b = a.cantidadPorRespuesta.find(b => b.textoRespuesta == respuestaSeleccionada);
        b.cantidad++;
        this.guardar();
        this.votoAgregado.notificar();
    }
};