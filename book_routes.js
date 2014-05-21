
var express = require("express"),
    http = require("http"),
    connect = require("connect"),
    books = require("./books.js")
;

//handlers for main app page (books.html)

function retrieveProfileHandler(req, res){
    console.log("the cookie: " + JSON.stringify( req.cookies ));
    var user = req.cookies.user;
    books.getProfile( user, function ( janswer ){res.json( janswer );} );
}

function saveProfileHandler(req, res){
    console.log("the cookie: " + JSON.stringify( req.cookies ));
    var the_body = req.body;
    the_body.user = req.cookies.user;  //add in the user name
    books.saveProfile( the_body, function ( janswer ){res.json( janswer );} );
}

function reloadBooksHandler( req, res ){
    console.log( "reload of books with cookie: " + JSON.stringify( req.cookies ));
    //if( req.cookies.user )
        //res.json({""})
}

module.exports = {
           "retrieveProfileHandler": retrieveProfileHandler,
           "saveProfileHandler": saveProfileHandler,
           "reloadBooks": reloadBooksHandler
                };
