// Todoolean
//
// Creiamo una app che permette di inserire e cancellare dei todos in una lista utilizzando la API boolean per fare operazioni CRUD.
// BONUS
// Aggiungiamo update del todo
// CONSIGLI
// Provate prima tutte le chiamate con POSTMAN come fatto assieme e salvatele, in modo da poterle usare come riferimento.
// Cerchiamo di fare tutte le operazioni con delle funzioni riutilizzabili.
// La grafica non è indispensabile, create un css base solo per poter interagire con i todos
//
// Guy Roger Eboulet - http://157.230.17.132:3015/todos

// CREATE
// READ
// UPDATE
// DELETE

$(document).ready(function(){
  printTodolist();

  $(".botton-list").on("click", function () {
    var todoValue = $(".input-list").val();
    createTodo(todoValue);
  });



});



// FUNCTION
// Read-CRUD
function printTodolist() {
  $.ajax({
    url: "http://157.230.17.132:3015/todos",
    method: "GET",
    success: function (data, response) {
      console.log(data);

      var source = $("#entry-template").html();
      var template = Handlebars.compile(source);

      for (var i = 0; i < data.length; i++) {
        var element = data[i];
        console.log(element);
        var context = {body: element.text};
        var html = template(context);
        $("ol.list").append(html);
      }
    },

    error: function (error, state, request) {
      console.log(error);
    }


  });

}


// Create-CRUD
function createTodo(todoValue) {

  $.ajax({
    url: "http://157.230.17.132:3015/todos",
    method: "POST",
    data: {
      text: todoValue
    },
    success: function (data) {
      //Svuotiamo quello che c'è nella lista:
      $("ol.list").html("");
      //Ristampiamo la lista svuotata:
      printTodolist();

    },
    error: function (error, state) {
      console.log("Errore" + error);
    }



  });

}
