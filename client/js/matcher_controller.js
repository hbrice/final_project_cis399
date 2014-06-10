/**
* Holly Brice & Heidi Niu
* CIS 399: Final Project
*/

console.log("matcher_controller - top of file");

/* handles Login with exsisting user result */
function handleLoginResult(resp_body) {
    console.log("Entered handleLoginResult.");
    console.log("resp_body " + JSON.stringify (resp_body ) );
    console.log("resp_body.password: " + resp_body.password);
    if (resp_body === "Alert") {
      console.log("In Alert");
      alert("Please enter your username and password.");
    }
    else if ((resp_body.password == false) || (resp_body.name == false)) {
      console.log("something is false");
      alert("Invalid username and password combination.");
    }
    else {
      console.log("in else");
      $("#feedback").text( JSON.stringify( resp_body) );
      sessionStorage.setItem( 'name', resp_body.name ); //setting global variable with name of user
      if( resp_body.url ) window.location = resp_body.url; //load main app page
    }
};

/* handles Register new user result */
function handleRegisterResult(resp_body) {
    console.log("Entered handleRegisterResult.");
    console.log("respt_body: " + JSON.stringify( resp_body ) );
    if (resp_body === "Alert") {
      console.log("In Alert");
      alert("Please fill out the entire registration form.");
    }
    if (resp_body === "Alert2") {
      alert("Username is taken.");
    }
    $("#feedback").text( JSON.stringify( resp_body) )
    sessionStorage.setItem( 'name', resp_body.name ); //setting global variable with name of user
    if( resp_body.url ) window.location = resp_body.url;
};

/* handles Forgot your password result */
function handlePasswordResult(resp_body) { 
    console.log("Entered handlePasswordResult.");
    console.log("resp_body: " + JSON.stringify (resp_body));
    $("#feedback").text (JSON.stringify( resp_body) )
    sessionStorage.setItem( 'name', resp_body.name ); //setting global variable with name of user
    if( resp_body.url ) window.location = resp_body.url;
}; 

function handleUsernameResult(resp_body) {
    console.log("resp_body: " + JSON.stringify (resp_body));
    if (resp_body === "Alert") {
      alert("Please submit a valid username.");
    }
      else {
      if (resp_body.question === "Q1") {
        $("#security_question").text( "What is the last name of your third grade teacher?" );
      }
      else if (resp_body.question === "Q2") {
        $("#security_question").text( "What was the make and model of your first car?" );
      }
      else { //Q3
        $("#security_question").text( "What is your mom's middle name?" );
      }
    }
};

function handleResetResult(resp_body) {
    console.log("Entered handleResetResult");
    //$("#feedback").text (JSON.stringify( resp_body));
    
    console.log("DO STUFF");

    var answer = $("#security_answer").val();
    console.log("answer: " + answer);
    console.log("resp body answer: "+ resp_body.answer);
    var new_password = $("#new_pass").val();
    console.log("NEW PASSWORD: " + new_password);

    if (answer.length === 0 ) {
      alert("Please input an answer.");
    }
    else if (new_password.length === 0 ) {
      alert("Please input a new password.");
    }
  

    else if (resp_body.answer === answer) {
      console.log("ANSWERS MATCH");

     
      resp_body.password = new_password; //reset password, is it saved in db? encrypted?
      //$("#feedback").text ("Password successfully changed!");
  //    $("#feedback").text (JSON.stringify( resp_body));
      $("#feedback").text ("Password successfully changed.");

      //encrypt password

      //save user fields
      var name = resp_body.name;
      var password = resp_body.password;
      var question = resp_body.question;
      //already have answer
      var id = resp_body.id;
      var compromised = resp_body.compromised;
      var history = resp_body.history;

      $.post("update.json",
               {"name": name, "password": password,
               "question": question, "answer": answer,
               "id": id, "compromised": compromised,
               "history": history },
               handleUpdateResult);

      window.location = "./index.html";
    }
    else {
      console.log("answers do not match");
      $("#feedback").text ("The answer you entered is incorrect.");
    }
};

function handleUpdateResult(resp_body) {

    console.log("Entered handleUpdateResult" + JSON.stringify( resp_body ) );
    var the_body = resp_body;
  
    $("#feedback").text("Password has been saved.");
    console.log("RESP BODY URL: " + resp_body.url);
    if( resp_body.url ) window.location = resp_body.url;
};


/* handles Retrieve Recommendation */
function handleRetrieveResult(resp_body) {
  //now i need to do shit
    console.log("Entered handleRetrieveResult" + JSON.stringify( resp_body ) );
    var the_body = resp_body;
    var msg = resp_body.message;
    var restaurant_name = resp_body.restaurant_name;
    var url = resp_body.url;

    if( msg === "no input"){
      $("#feedback").text("You forgot to enter input and save!");
    }else{
      $("#feedback").html("May we recommend... " + restaurant_name + ". You can view it at <a href='" + url + "' target='_blank'>Click Here</a>");
    }
};

/* Handles button clicks */
var index_main = function (){
  console.log("matcher_controller - inside index_main");
  /* Login exsisting user button */
  $("button#loginButton").on("click", function (event){ 
        console.log("matcher_controller - login button clicked");
        $.get("login.json",
               {"name": $("#old_name").val(), "password": $("#old_pass").val() },
               handleLoginResult);
   });

    /* Register new user Button */
   $("button#registerButton").on("click", function (event){ 
    console.log("matcher_controller - register button clicked");
   
    var answer = $("#security_answer").val();
    var question = $("#security_question").val()
    console.log("SECURITY QUESTION: " + question);
    console.log("SECURITY ANSWER: " + answer);

        $.post("register.json",
               {"name": $("#new_name").val(), "password": $("#new_pass").val(),
               "question": question, "answer": answer },
               handleRegisterResult);
   });

   /* Forgot your password button*/
   $("button#passwordButton").on("click", function (event){
    console.log("matcher_controller - password button clicked");
      $.get("password.json",
              {"name": $("#old_name").val()},
              handlePasswordResult);
   });

   /* On places.html - saves the 'user' profile choices. */
   $("button#save").on("click", function( event ){
      //get all data together
      console.log("matcher_controller - Save - button clicked.");
      var meal_time = $("select#mealtime").val();
      var food_category = $("select#food_category").val();
      var price = $("select#price").val();
      var name = sessionStorage.getItem('name'); 
      console.log("matcher_controller - ^^^^^ " + meal_time, food_category, price, name);
      // it is getting the correct info
      var updatedUser = {
          "name": name,
          "meal_time": meal_time, 
          "food_category": food_category, 
          "price": price, 
      };
       
       //send it to server
      $.post("save.json", updatedUser, function( err, result ){
          console.log("matcher_controller - updateUser: " + JSON.stringify( updatedUser) );
          console.log("matcher_controller - Sending update to server");
          console.log("^^^^^ "+ JSON.stringify( err));

        if( err ){   
          console.log("matcher_controller - Error while sending to server = " + JSON.stringify( err) );
          result.json( err );  //if error occurs'
        } else {
          console.log("result: " + result);
    //      result.json( result ); //send the result
        }
        $("#feedback").text("Now Click 'I'm feeling hungry' button!");
      }); 

      //update model
      UserModel.setAll( {"name": name, "meal_time": meal_time, "food_category": food_category, "price": price});
     
     }); //end of save button

  /* On places.html when recommendation button is clicked, pull 'user' info and match against db and display result on page. */
  $("button#recommendation").on("click", function( event ){
      //get all data together
      console.log("matcher_controller - Recommendation - button clicked.");

      $("#feedback").empty();
      var data = UserModel.getAll();
      //console.log("Usermodel.getAll(): " + JSON.stringify( UserModel.getAll() ));
      console.log("&&& data: "+ JSON.stringify( data) );

      if ((data.name === null) && (data.meal_time === null) && (data.food_category === null) && (data.price === null) ){
        console.log("ITS EMPTY");
        alert("Save your food choices before getting a recommendation!")
      }

      var meal_time = data.meal_time;
      console.log("$$$$$$meal_time: " + meal_time);
      var food_category = data.food_category;
      var price = data.price;
      var name = sessionStorage.getItem('name'); 
      var sending = { //data is sent to resturants.js -> mongoGetRestaurant
        "meal_time": meal_time, 
        "food_category": food_category, 
        "price": price,
      }

      console.log("SENDING TO RETRIEVEREST.");
      $.post("retrieveRest.json", sending, handleRetrieveResult);// this returns the user info

  }); //end of recommend button


  $("button#usernameButton").on("click", function( event ){ //on password.html
    console.log("submit username button clicked.");

     $.get("username.json",
          {"name": $("#username").val()},
          handleUsernameResult);
  }); 

   $("button#resetButton").on("click", function( event ){ //on password.html
    console.log("reset button clicked.");

     $.get("reset.json",
          {"name": $("#username").val(), "answer": $("#answer").val(), "password": $("#new_pass").val()},
          handleResetResult);
  }); 

} //end of main
