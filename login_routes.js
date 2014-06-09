/*
* Holly Brice & Heidi Niu
* CIS 399: Final Project
*/
var login = require("./login.js");
// var mongoose = require("mongoose"),
//   mongoUrl;

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
            res.cookie('name', the_body.name, cookie_options);
            res.json({"url": "./places.html", "name": the_body.name});
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
        res.json( janswer );
    else {
        res.cookie('name', the_body.name, cookie_options);
        res.json({"url": "./places.html", "name": the_body.name});
    };
  });
}

function passwordHandler(req, res) {
  console.log("Entered login_routes.js - passwordHandler");
  var the_body = req.query;
  console.log("forgot password request: " + JSON.stringify(the_body));
  login.handlePassword(the_body, function(janswer){
    console.log("forgot password result: " + JSON.stringify(janswer));
    //if (janswer.question !== true) {
      //res.json(janswer);
    //}
    //else {
      res.cookie("name", the_body.name, cookie_options);
      res.json({"url": "./password.html", "name": the_body.name});
    //}
  });
}

function usernameHandler(req, res) {
  console.log("Entered login_routes.js - usernameHandler");
  var the_body = req.query;
  console.log("username the_body: " + JSON.stringify(the_body));
  login.handleUsername(the_body, function(janswer){
    console.log("username handler result: " + JSON.stringify(janswer));
    //f (janswer.question !== true) {
      res.json(janswer);
    //}
    //else {
      //res.cookie("name", the_body.name, cookie_options);
      //res.json({"url": "./password.html", "name": the_body.name});
    //}
  });
}


module.exports = {
  "loginHandler": loginHandler,
  "registerHandler": registerHandler,
  "passwordHandler": passwordHandler,
  "usernameHandler": usernameHandler
};
