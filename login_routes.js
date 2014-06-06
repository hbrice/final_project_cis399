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


module.exports = {
  "loginHandler": loginHandler,
  "registerHandler": registerHandler,
};
