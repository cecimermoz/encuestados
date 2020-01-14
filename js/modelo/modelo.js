/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento (this);
  this.borrarTodo = new Evento (this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    if(this.preguntas.length == 0){
      return 0;
    } else {
      var idAnterior = this.preguntas[0].id; 
      for(var i = 0; i<this.preguntas.length;i++){
        idActual = this.preguntas[i].id;
        if(idActual >= idAnterior){
          idAnterior = idActual;
        }
      }
      return idAnterior;
    }
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function(id){
    var nueva = this.preguntas.filter(e => e.id !== id);
    this.preguntas = nueva;
    this.guardar();
    this.preguntaBorrada.notificar();
  },

  borarTodo: function(){
    var boton = $('#borrarTodo');
    var miThis = this;
    boton.click(function(){
      miThis.preguntas.forEach(element => miThis.preguntas.pop());
    });
    this.guardar();
    this.borrarTodo.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
  },
}
