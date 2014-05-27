/**
* Holly Brice & Heidi Niu
* CIS399: Final Project
*/
console.log("top of file");

function handleLoginResult(resp_body) {
    console.log("Entered handleLoginResult.");
    console.log( resp_body );
    $("#feedback").text( JSON.stringify( resp_body) );
    sessionStorage.setItem( 'name', resp_body.user ); //setting global variable with name of user
    if( resp_body.url ) window.location = resp_body.url; //load main app page
};

function handleRegisterResult(resp_body) {
    console.log("Entered handleRegisterResult.");
    console.log( resp_body );
    $("#feedback").text( JSON.stringify( resp_body) )
    sessionStorage.setItem( 'name', resp_body.user ); //setting global variable with name of user
    if( resp_body.url ) window.location = resp_body.url;
};

var index_main = function (){
  console.log("inside index_main");
  $("button#login").on("click", function (event){ 
        console.log("login button clicked");
        $.get("login.json",
               {"name": $("#old_name").val(), "password": $("#old_pass").val() },
               handleLoginResult);
   });

   $("button#register").on("click", function (event){ 
    console.log("register button clicked");
        $.post("register.json",
               {"name": $("#new_name").val(), "password": $("#new_pass").val() },
               handleRegisterResult);
   });

   $("button#save").on("click", function( event ){
      //get all data together
      console.log("Save - button clicked.");
      var meal_time = $("select#mealtime").val();
      var food_category = $("select#food_category").val();
      var price = $("select#price").val();
      var goal_meal = $("input#goal_meal").val();
      var name = sessionStorage.getItem('name'); 
      console.log("^^^^^ " + meal_time, food_category, price, goal_meal);
      // it is getting the correct info
      var updatedUser = {"name": name,
              "meal_time": meal_time, 
              "food_category": food_category, 
              "price": price, 
              "goal_meal": goal_meal
            };
       
       //send it to server
      $.post("save.json", updatedUser, function( err, result ){
          console.log("Sending update to server");
        //alert("Err: " + err + "\nStatus: " + result);
        if( err ){   
          console.log("Error while sending to server = " + err);
          res.json( err );  //if error occurs
        } else {
          res.json( result ); //send the result
        }
        $("#feedback").text("This data was saved");
      }); 

      //update model
      UserModel.setAll( {"meal_time": meal_time, "food_category": food_category, "price": price, "goal_meal": goal_meal});
     
     }); //end of button

  $("button#retrieve").on("click", function( event ){
      //get all data together
      console.log("Retrieve - button clicked.");
      $("#feedback").empty();

      console.log( UserModel.getAll() );

      var meal_time = $("select#mealtime").val();
      var food_category = $("select#food_category").val();
      var price = $("select#price").val();
      var goal_meal = $("input#goal_meal").val();
      var name = sessionStorage.getItem('name'); 
      
       //for testing output - will want to get info from server
      $("#feedback").text("Meal time = " + meal_time +
         ". Food category = " + food_category + 
         ". Price = " + price + 
         ". Goal Meal = " + goal_meal + 
         ". Name = " + name + ".");

  }); //end of button




} //end of main
