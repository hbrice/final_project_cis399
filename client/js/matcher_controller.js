/**
* Holly Brice & Heidi Niu
* CIS 399: Final Project
*/
console.log("matcher_controller - top of file");

/* handles Login with exsisting user result */
function handleLoginResult(resp_body) {
    console.log("Entered handleLoginResult.");
    console.log("resp_body " + JSON.stringify (resp_body ) );
    $("#feedback").text( JSON.stringify( resp_body) );
    sessionStorage.setItem( 'name', resp_body.name ); //setting global variable with name of user
    if( resp_body.url ) window.location = resp_body.url; //load main app page
};

/* handles Register new user result */
function handleRegisterResult(resp_body) {
    console.log("Entered handleRegisterResult.");
    console.log("respt_body: " + JSON.stringify( resp_body ) );
    $("#feedback").text( JSON.stringify( resp_body) )
    sessionStorage.setItem( 'name', resp_body.name ); //setting global variable with name of user
    if( resp_body.url ) window.location = resp_body.url;
};

/* handles Forgot your password result */
function handlePasswordResult(resp_body) { //FILL IN*******
    console.log("Entered handlePasswordResult.");
    console.log("resp_body: " + JSON.stringify (resp_body));
    //$("#feedback").text( JSON.stringify( resp_body) )
    //sessionStorage.setItem( 'name', resp_body.name ); //setting global variable with name of user
    //if( resp_body.url ) window.location = resp_body.url;
};

/* handles Retrieve Recommendation */
function handleRetrieveResult(resp_body) {
  //now i need to do shit
    console.log("Entered handleRetrieveResult" + JSON.stringify( resp_body ) );
    var the_body = resp_body;
    var msg = resp_body.message;
    var restaurant_name = resp_body.restaurant_name;
    if( msg === "no input"){
      $("#feedback").text("You forgot to enter input and save!");
    }else{
      $("#feedback").text("May we recommend... " + restaurant_name);
    }
};

/* Handles button clicks */
var index_main = function (){
  console.log("matcher_controller - inside index_main");
  /* Login exsisting user button */
  $("button#loginButton").on("click", function (event){ 
        console.log("matcher_controller - login button clicked");
        $.get("login.json",
               {"name": $("#old_name").val(), "password": $("#old_pass").val(),
               "question": $("#security_question").val(), "answer": $("security_answer".val()) },
               handleLoginResult);
   });

    /* Register new user Button */
   $("button#registerButton").on("click", function (event){ 
    console.log("matcher_controller - register button clicked");
        $.post("register.json",
               {"name": $("#new_name").val(), "password": $("#new_pass").val() },
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
      var goal_meal = $("input#goal_meal").val();
      var name = sessionStorage.getItem('name'); 
      console.log("matcher_controller - ^^^^^ " + meal_time, food_category, price, goal_meal, name);
      // it is getting the correct info
      var updatedUser = {
          "name": name,
          "meal_time": meal_time, 
          "food_category": food_category, 
          "price": price, 
          "goal_meal": goal_meal
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
        $("#feedback").text("This data was saved");
      }); 

      //update model
      UserModel.setAll( {"name": name, "meal_time": meal_time, "food_category": food_category, "price": price, "goal_meal": goal_meal});
     
     }); //end of save button

  /* On places.html when recommendation button is clicked, pull 'user' info and match against db and display result on page. */
  $("button#recommendation").on("click", function( event ){
      //get all data together
      console.log("matcher_controller - Recommendation - button clicked.");
      $("#feedback").empty();
      var data = UserModel.getAll();
      //console.log("Usermodel.getAll(): " + JSON.stringify( UserModel.getAll() ));
      console.log("data: "+ JSON.stringify( data) );
      var meal_time = data.meal_time;
      console.log("$$$$$$meal_time: " + meal_time);
      var food_category = data.food_category;
      var price = data.price;
      var goal_meal = data.goal_meal;
      var name = sessionStorage.getItem('name'); 
      var sending = { //data is sent to resturants.js -> mongoGetRestaurant
        "meal_time": meal_time, 
        "food_category": food_category, 
        "price": price,
        "goal_meal": goal_meal
      }

      console.log("SENDING TO RETRIEVEREST.");
      $.post("retrieveRest.json", sending, handleRetrieveResult);// this returns the user info

  }); //end of recommend button


} //end of main
