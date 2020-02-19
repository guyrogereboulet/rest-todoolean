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

  $(document).on("click",".botton-list", function () {
    var todoValue = $(".input-list").val();

    //aggiungo il cerchio di caricamento
    $(".loading").addClass("active");
    setTimeout(createTodo, 2000, todoValue)
    // createTodo(todoValue);
  });

  $(document).on("click", ".delete-list-element", function () {
    var thisElement = $(this);
    var idTodo = thisElement.siblings().attr('data-id');
    console.log(idTodo);
    deleteTodo(idTodo);
  });



});



// FUNCTION
// Read-CRUD
function printTodolist() {
  $.ajax({
    url: "http://157.230.17.132:3015/todos",
    method: "GET",
    success: function (data) {
      console.log(data);

      var source = $("#entry-template").html();
      var template = Handlebars.compile(source);

      for (var i = 0; i < data.length; i++) {
        var element = data[i];
        console.log(element);
        var context = {
          body: element.text,
          id: element.id
        };
        var html = template(context);
        $("ol.list").append(html);
      }
      //Rimuovo il cerchio di caricamento
      $(".loading").removeClass("active");
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
      clear();

      //Ristampiamo la lista svuotata:
      printTodolist();

    },
    error: function (error, state) {
      console.log("Errore" + error);
    }

  });

}


// Delete-CRUD
function deleteTodo(id) {
  $.ajax({
    url: "http://157.230.17.132:3015/todos/" + id ,
    method: "DELETE",
    success: function (data) {
      //Svuotiamo quello che c'è nella lista:
      clear();
      //Ristampiamo la lista svuotata:
      printTodolist();

    },
    error: function (error, state) {
      console.log("Errore" + error);
    }

  });

}

function clear() {
 $("ol.list").html("");
}
