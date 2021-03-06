
var express = require("express"),
    http = require("http"),
    connect = require("connect"),
    places = require("./restaurants.js");

/** handlers for main app page (places.html) */

//add recommend handler
function retrieveProfileHandler(req, res){
    console.log("the cookie in retrieveProfileHandler: " + JSON.stringify( req.cookies ));
    var name = req.cookies.name;
    places.getProfile( name, function ( janswer ){res.json( janswer );} );
}

function retrieveRestaurantHandler(req, res){
    //console.log("the cookie in retrieveRestaurantHandler: " + JSON.stringify( req.cookies ));
    var the_body = req.body;
    //var food_category = the_body.food_category;
    console.log("the_body for restaurant handler: " + JSON.stringify( the_body) );
    //var restaurant_name = req.cookies.restaurant_name;
    //console.log("restaurant_name: " + JSON.stringify( restaurant_name ));
    places.getRestaurant( the_body, function ( janswer ){res.json( janswer );} );
}

function saveProfileHandler(req, res){
    console.log("the cookie in saveProfileHandler: " + JSON.stringify( req.cookies ));
    var the_body = req.body;
    console.log("the_body: "+ JSON.stringify( the_body ));
    the_body.name = req.cookies.name;  //add in the user name
    places.saveProfile( the_body, function ( janswer ){res.json( janswer );} );
}

//ithink i can delete this one
function reloadPlacesHandler( req, res ){
    console.log( "reload of places with cookie: " + JSON.stringify( req.cookies ));
    //if( req.cookies.user )
        //res.json({""})
}

module.exports = {
   "retrieveProfileHandler": retrieveProfileHandler,
   "saveProfileHandler": saveProfileHandler,
   "reloadRestaurants": reloadPlacesHandler,
   "retrieveRestaurantHandler": retrieveRestaurantHandler
};
