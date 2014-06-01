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
        $.post("register.json",
               {"name": $("#new_name").val(), "password": $("#new_pass").val() },
               handleRegisterResult);
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
      var food_category = data.food_category;
      var price = data.price;
      var goal_meal = data.goal_meal;
      var name = sessionStorage.getItem('name'); 

      /*$.getJSON("retrieve.json", function(err, result){
        console.log("inside getJSON function.");
        if( err ){   
          console.log("matcher_controller - Error while sending to server = " + JSON.stringify( err) );
          result.json( err );  //if error occurs'
        } else {
          console.log("result: " + result); //result = success
          var restaurantData = Restaurant.getAll( restaurant_name, meal_time, food_category, price, goal_meal );
          console.log("matcher_controller- RestaurantDATA: "+ JSON.stringify( restaurantData ));

        //      result.json( result ); //send the result
        }

        Restaurant.forEach( function( obj ){
          console.log("** " + obj);
        });*/
                    /*function( player ){
                      var name = player.person.handle;
                       var $all_cards = $(player.hand);
                       //$hand = [{rank: "two", suit: "clubs"}, {...}. etc.] - an array of five card objects
                       var $hand = $all_cards.map( function (i, card) {         //jquery map has args reversed - sigh
                           var $card = $(card);   //jquery map unwraps arg - need to wrap it again
                           var obj = {};
                           obj.rank = $card[0].rank;
                           obj.suit = $card[0].suit;
                           return obj;
                          });
                       player.hand = $.makeArray( $hand );    //now have simple array
                    });  
                    //end forEach*/


        $("#feedback").text("May we recommend... ");
      });

      /* check all the resturants to see what matches, then get more specific from there */
     // var restaurantData = Restaurant.getAll( restaurant_name, meal_time, food_category, price, goal_meal );
     /* for (var place in all_restaurants){
        var value = all_restaurants[place];
        Restaurant.findOneAndUpdate( value, {}, {upsert: true}, function(err, doc){
          console.log( "test err: " + err);
          console.log( "test doc: " + doc);
        });
      }*/

      
       //for testing output - will want to get info from server
      //$("#feedback").text("May we recommend... ");
  }); //end of recommend button


} //end of main
