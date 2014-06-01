/*
* Holly Brice & Heidi Niu
* CIS 399: Final Project
*/
var mongoose = require("mongoose"),
    mongoUrl;

// set up our services
if (process.env.VCAP_SERVICES) {
           services = JSON.parse(process.env.VCAP_SERVICES);
           console.log( JSON.stringify( services ));
           mongoUrl = services["mongolab"][0].credentials.uri;
} else {
           //use this when not running on Cloud Foundry
           mongoUrl = "mongodb://localhost/login2";
}

//test out moongoose
mongoose.createConnection(mongoUrl);  //need createConnection because have two - see login.js

var db = mongoose.connection;

db.once('open', function () {
  console.log( "moongoose foods open!")});
db.on('error', console.error.bind(console, 'foods connection error:'));
db.once('connecting', function () {
  console.log( "moongoose foods connecting!")});
db.once('connected', function () {
  console.log( "moongoose foods connection!")});
db.on('disconnecting', function () {
  console.log( "moongoose foods disconnecting!")});
process.on('SIGINT', function() {
     db.close(function () {
       console.log('Mongoose foods disconnected through app termination');
       process.exit(0);
  });
});

var profile_schema = mongoose.Schema({ 
    name: String, //ie. Bob
    meal_time: String, //ie. breakfast
    food_category: String, //ie. Thai
    price: String, //ie. $8-$15
    goal_meal: String //ie. fried rice
  });

var profile_model = mongoose.model("profile", profile_schema); //profile => collection profiles

//put something in db to define it.
// var query = {"name": "steve", food_category: "Thai"};
// profile_model.findOneAndUpdate( query, {}, {upsert: true}, function( err, doc){
//                                   console.log("profile test query: " + err + " & " + doc);}
//                                   );

function mongoGet( name, callBack ){
    console.log( "mongoGet: " + name );
    profile_model.find({"name": name}, function (err, result) {
          console.log( "result of find: " + result);
          if (err !== null) {
             console.log("ERROR: " + err);
             callBack({"food_category": null, "meal_time": null, "goal_meal": null, "price": null});
             return;
       }
       if( result.length > 0 ) callBack({"food_category": result[0].food, "meal_time": body.meal_time, "goal_meal": body.goal_meal, "price": body.price});
       else callBack({"food_category": null});
       }
  );
}

//http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
function mongoSave( body, callBack ){
  console.log( "mongoSave: " + JSON.stringify( body ) );
  var query = {"name": body.name};
  profile_model.findOneAndUpdate( query, {"food_category": body.food_category, "meal_time": body.meal_time, "goal_meal": body.goal_meal, "price": body.price}, {upsert: true, "new": true},
      function(err, doc){ 
        console.log( "saved: " + JSON.stringify( doc) );
        callBack( err, doc ); 
      });
}

module.exports = {
  "getProfile": mongoGet,
  "saveProfile": mongoSave
};