//matcher_controller


function handleLoginResult(resp_body) {
      console.log( resp_body );
      $("#feedback").text( JSON.stringify( resp_body) );
      sessionStorage.setItem( 'name', resp_body.user ); //setting global variable with name of user
      if( resp_body.url ) window.location = resp_body.url; //load main app page
  };

   function handleRegisterResult(resp_body) {
      console.log( resp_body );
      $("#feedback").text( JSON.stringify( resp_body) )
      sessionStorage.setItem( 'name', resp_body.user ); //setting global variable with name of user
      if( resp_body.url ) window.location = resp_body.url;
  };

var index_main = function (){
  console.log("inside index_main");
  $("button#login").on("click", function (event){ 
        console.log("button clicked");
        $.get("login.json",
               {"name": $("#old_name").val(), "password": $("#old_pass").val() },
               handleLoginResult);
   });

   $("button#register").on("click", function (event){ 
    console.log("****");
        $.post("register.json",
               {"name": $("#new_name").val(), "password": $("#new_pass").val() },
               handleRegisterResult);
   });


   $("button#modify").on("click", function( event ){
      //get all data together
      console.log("button clicked.");
      var meal_time = $("select#meal_time").val();
      var food_category = $("select#food_category").val();
      var price = $("select#price").val();
      var goal_meal = $("input#goal_meal").val();
      var name = sessionStorage.getItem('name'); 
      var updatedUser = {"name": name,
              "meal_time": meal_time, 
              "food_category": food_category, 
              "price": price, 
              "goal_meal": goal_meal
            };
       //send it to server
      $.post("save.json", updatedUser, function( err, result ){
        if (err){   //if error, then repost
          console.log(err);
        }

      }); 

      //update model
      UserModel.setAll( {"meal_time": meal_time, "food_category": food_category, "price": price, "goal_meal": goal_meal})
     });

} //end of main
