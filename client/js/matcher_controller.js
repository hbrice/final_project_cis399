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

  $("button#login").on("click", function (event){ 
        $.get("login.json",
               {"name": $("#old_name").val(), "password": $("#old_pass").val() },
               handleLoginResult);
   });

   $("button#register").on("click", function (event){ 
        $.post("register.json",
               {"name": $("#new_name").val(), "password": $("#new_pass").val() },
               handleRegisterResult);
   });


   $("button#modify").on("click", function( event ){
   	//get all data together
   	var meal_time = $("select#meal_time").val();
   	var food_category = $("select#food_category").val();
   	var price = $("select#price").val();
    var goal_meal = $("input#goal_meal").val();
   	var name = sessionStorage.getItem('name'); 

   	//send it to server
   	$.post("modify_user_profile.json", {...}, function( err, result ){
   		//if error, repost
   	}); 

   	//update model
   	UserModel.setAll( {max_monthly: max, current_providers: currentprovider})
   });


}
