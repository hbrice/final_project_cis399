/*
* Holly Brice & Heidi Niu
* CIS 399: Final Project
*/
var login = require("./login.js");
var cookie_options = {};

/** HANDLERS FOR LOGIN PAGE */

//expect body to be {name: String, password: String}
//provides callBack with either {url: url} or {name: Bool, password: Bool}
function loginHandler(req, res){
    console.log("Entered login_routes.js - loginHandler");
    var the_body = req.query;
    console.log ( "login request: " + JSON.stringify(the_body) );
    login.handleLogin( the_body, function ( janswer ){
        console.log( "login resonse: " + JSON.stringify( janswer));
        if( janswer.name !== true || janswer.password !== true )
            res.json( janswer );
        else {
          if (janswer === "Alert") {
            console.log("In Alert loginHandler");
            res.json("Alert");
          } else {
            res.cookie('name', the_body.name, cookie_options);
            res.json({"url": "./places.html", "name": the_body.name});
          }
        };
    });
}

//expect body to be {name: String, password: String}
//provides callBack with either {saved: Bool} or {name: Bool, password: Bool}
function registerHandler(req, res){
  console.log("Entered login_routes.js - registerHandler");
  var the_body = req.body;
  console.log ( "registration request: " + JSON.stringify( the_body ));
  login.handleRegistration( the_body , function ( janswer ){
    console.log( "registration result: " + JSON.stringify( janswer));
    if( janswer.saved === false )
        //res.json( janswer );
        res.json("Alert2");
    else {
      if (janswer === "Alert") {
        console.log("In Alert registerHandler");
        res.json("Alert");
      } else {
        res.cookie('name', the_body.name, cookie_options);
        res.json({"url": "./places.html", "name": the_body.name});
      }
    };
  });
}

function passwordHandler(req, res) {
  console.log("Entered login_routes.js - passwordHandler");
  var the_body = req.query;
  console.log("forgot password request: " + JSON.stringify(the_body));
  login.handlePassword(the_body, function(janswer){
    console.log("forgot password result: " + JSON.stringify(janswer));

    res.cookie("name", the_body.name, cookie_options);
    res.json({"url": "./password.html", "name": the_body.name});
  });
}

function usernameHandler(req, res) { //for username submit on password.html
  console.log("Entered login_routes.js - usernameHandler");
  var the_body = req.query;
  console.log("username the_body: " + JSON.stringify(the_body));
  login.handleUsername(the_body, function(janswer){
    console.log("username handler result: " + JSON.stringify(janswer));
    
    res.json(janswer);
  });
}

function resetHandler(req, res) { //for answer and new password on password.html
  console.log("Entered login_routes.js - resetHandler");
  var the_body = req.query;
  console.log("reset the_body " + JSON.stringify(the_body));
  login.handleReset(the_body, function(janswer) {
    console.log("reset handler result: " + JSON.stringify(janswer));
    res.json(janswer);
  })
}

function updateHandler(req, res){ //for updating user with new password
  console.log("Entered login_routes.js - updateHandler");
  var the_body = req.body;
  login.handleUpdate( the_body , function ( janswer ){
    console.log( "update result: " + JSON.stringify( janswer));
  });
}

module.exports = {
  "loginHandler": loginHandler,
  "registerHandler": registerHandler,
  "passwordHandler": passwordHandler,
  "usernameHandler": usernameHandler,
  "resetHandler": resetHandler,
  "updateHandler": updateHandler
};
