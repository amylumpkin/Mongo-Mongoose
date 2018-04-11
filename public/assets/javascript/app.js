//get articles as a json
$.getJSON("/articles", function(data) {
    for (let i = 0; i < data.length; i++) {
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });
  
//when p tag is clicked
  $(document).on("click", "p", function() {
    $("#notes").empty();
    const thisId = $(this).attr("data-id");
  
    //ajax call to get article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      //add note to page
      .then(function(data) {
        console.log(data);
        //title
        $("#notes").append("<h2>" + data.title + "</h2>");
        //input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        //textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        //submit added to a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        //if there's a note in the article
        if (data.note) {
          //title of the note goes in the title input
          $("#titleinput").val(data.note.title);
          //body of the note goes in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
    //on click the savenote button
    $(document).on("click", "#savenote", function() {
    //get id associated with the article from the submit button
    const thisId = $(this).attr("data-id");
  
    //post request to change the note
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        //title input value
        title: $("#titleinput").val(),
        //note textarea value
        body: $("#bodyinput").val()
      }
    })
      
      .then(function(data) {
        console.log(data);
        $("#notes").empty();
      });
  
    
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  