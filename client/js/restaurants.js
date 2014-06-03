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
           mongoUrl = "mongodb://localhost/hhdb";
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

/* Defining Profile model for database */

var profile_schema = mongoose.Schema({ 
    name: String, //ie. Bob
    meal_time: String, //ie. breakfast
    food_category: String, //ie. Thai
    price: String, //ie. $8-$15
    goal_meal: String //ie. fried rice
  });

var profile_model = mongoose.model("profile", profile_schema); //profile => collection profiles
// ie. {"name": "Bob", "meal_time": ["breakfast"], "food_category": ["mexican"], "price": "min", "goal_meal": "egg"};

/* Defining Retaurant model for database */
/* set up resturant collection */
var RestaurantSchema = mongoose.Schema({ 
  restaurant_name: {'unique': true, type: String},
  meal_time: [String],
  food_category: [String], 
  price: String, 
  goal_meal: [String]
});

var RestaurantModel = {
  restaurant_name: null,
  meal_time: null,
  food_category: null,
  price: null,
  goal_meal: null,
  getAll: function(restaurant_name, meal_time, food_category, price, goal_meal ){
    //trying to match all Restaurants that match any of these statemnts
    Restaurant.find({ $or: [ { meal_time: meal_time}, {food_category: food_category}, {price: price}, {goal_meal: goal_meal} ]}, function(err, result){
      console.log("restaurant.js - RESULT: " + JSON.stringify( result ));
    });
  }
};

var Restaurant = mongoose.model("Restaurant", RestaurantSchema);

/* Restaurant entry for DB */
var all_restaurants = [
  {"restaurant_name": "Caspian", "meal_time": ["breakfast", "lunch", "dinner"], "food_category": ["mediterranean", "american"], "price": "min", "goal_meal": ["egg", "curry", "salad", "quesadilla", "burger", "gyro", "falafel", "burrito"]},
  {"restaurant_name": "Rennies_Landing", "meal_time": ["breakfast", "lunch", "dinner"], "food_category": ["pubfood", "american"], "price": "min", "goal_meal": ["egg", "chicken", "gardenburger", "steak", "nacho", "hotwing", "pancake", "salad", "quesadilla", "burger", "gyro", "falafel"]},
  {"restaurant_name": "Qdoba", "meal_time": ["breakfast", "lunch", "dinner"], "food_category": ["mexican"], "price": "min", "goal_meal": ["egg", "burrito", "nacho", "gumbo", "taco", "salad", "quesadilla", "chip"]},
  {"restaurant_name": "East_Meets_West", "meal_time": ["lunch", "dinner"], "food_category": ["asian"], "price": "min", "goal_meal": ["fried_rice", "soup", "noodle", "chow mein", "shrimp", "pork", "chicken", "beef", "rice"]},
  {"restaurant_name": "Glenwood", "meal_time": ["breakfast", "lunch", "dinner"], "food_category": ["american", "asian"], "price": "med", "goal_meal": ["egg", ,"burrito"]},
  {"restaurant_name": "Webfoot_Bar_and_Grill", "meal_time": ["breakfast", "lunch", "dinner"], "food_category": ["american", "pubfood"], "price": "med", "goal_meal": ["egg", "sandwich", "nacho", "salad", "burrito"]},
  {"restaurant_name": "Alder_Street_Fish_Co", "meal_time": ["lunch", "dinner"], "food_category": ["american"], "price": "med", "goal_meal": ["fish_and_chip", "sandwich", "burger", "soup", "salad", "fish"]},
  {"restaurant_name": "Sweet_Basil_Express", "meal_time": ["lunch", "dinner"], "food_category": ["thai"], "price": "min", "goal_meal": ["pad thai", "noodle", "soup", "rice", "fried_rice", "curry"]},
  {"restaurant_name": "DairyQueen", "meal_time": ["lunch", "dinner", "dessert"], "food_category": ["american"], "price": "min", "goal_meal": ["burger", "salad", "cake", "chicken", "ice cream"]},
  {"restaurant_name": "DoughCo", "meal_time": ["lunch", "dinner"], "food_category": ["italian"], "price": "min", "goal_meal": ["calzone", "chicken"]},
  {"restaurant_name": "Pegasus_Pizza", "meal_time": ["lunch", "dinner"], "food_category": ["italian"], "price": "med", "goal_meal": ["pizza", "salad", "calzone", "sandwich"]},
  {"restaurant_name": "Porcellino_Bistro", "meal_time": ["lunch", "dinner"], "food_category": ["italian", "american"], "price": "med", "goal_meal": ["pizza", "salad", "sandwich", "panini"]},
  {"restaurant_name": "Sy's_Pizza", "meal_time": ["lunch", "dinner"], "food_category": ["italian"], "price": "min", "goal_meal": ["pizza"]},
  {"restaurant_name": "Taylor's_Bar_&_Grill", "meal_time": ["breakfast", "lunch", "dinner"], "food_category": ["pubfood", "american"], "price": "min", "goal_meal": ["egg", "sandwich", "chicken", "gardenburger", "steak", "nacho", "hotwing", "pancake", "salad", "quesadilla", "burger"]},
  {"restaurant_name": "Evergreen_Indian_Restaurant", "meal_time": ["lunch", "dinner"], "food_category": ["asian"], "price": "med", "goal_meal": ["curry", "chicken", "lamb", "masala", "rice", "seafood"]},
  {"restaurant_name": "Cafe_Siena", "meal_time": ["breakfast", "lunch"], "food_category": ["american", "mexican"], "price": "min", "goal_meal": ["bagel", "sandwich", "egg", "crepe", "burrito", "rice", "bean", "chicken", "potato"]},
  {"restaurant_name": "Wild_Duck_Cafe", "meal_time": ["breakfast", "lunch", "dinner"], "food_category": ["american", "italian"], "price": "med", "goal_meal": ["egg", "waffle", "pancake", "chip", "burger", "chicken", "nacho", "fries", "sandwich", "salmon", "pasta", "soup", "salad", "steak", "macaroni"]},
  {"restaurant_name": "Track_Town_Pizza", "meal_time": ["lunch", "dinner"], "food_category": ["italian"], "price": "max", "goal_meal": ["pizza", "salad"]},
  {"restaurant_name": "Excelsior_Inn_and_Risorante_Italiano", "meal_time": ["breakfast", "lunch", "dinner"], "food_category": ["italian"], "price": "max", "goal_meal": ["egg", "pasta", "pizza", "salad", "burger", "seafood", "shrimp", "salmon"]},
  {"restaurant_name": "Noodle_Head", "meal_time": ["lunch", "dinner"], "food_category": ["asian"], "price": "min", "goal_meal": ["noodle", "pasta", "chicken", "pork", "beef", "pho", "soup"]},
  {"restaurant_name": "Cafe_Seoul", "meal_time": ["lunch", "dinner"], "food_category": ["asian"], "price": "min", "goal_meal": ["soup", "rice", "teriyaki", "noodle", "chicken", "beef"]},
  {"restaurant_name": "Maple_Garden", "meal_time": ["lunch", "dinner"], "food_category": ["asian"], "price": "min", "goal_meal": ["soup", "fried_rice", "rice", "chicken", "beef", "shrimp", "noodle"]},
  {"restaurant_name": "Teriyaki_Boy", "meal_time": ["lunch", "dinner"], "food_category": ["asian"], "price": "min", "goal_meal": ["rice", "chicken", "shrimp", "fried_rice", "tofu", "sushi"]},
  {"restaurant_name": "Barry's_Espresso", "meal_time": ["breakfast", "lunch", "dessert"], "food_category": ["american"], "price": "min", "goal_meal": ["bagel", "sandwich", "panini", "hot_dog", "salad", "cookie", "egg", "bacon"]},
  {"restaurant_name": "Yogurt_Extreme", "meal_time": ["dessert"], "food_category": ["american"], "price": "min", "goal_meal": ["frozen_yogurt", "chocolate"]},
  {"restaurant_name": "Milky_Way", "meal_time": ["breakfast", "lunch"], "food_category": ["american", "asian"], "price": "min", "goal_meal": ["bagel", "sandwich"]},
  {"restaurant_name": "Peachwave", "meal_time": ["dessert", "lunch", "dinner"], "food_category": ["american, asian"], "price": "min", "goal_meal": ["frozen_yogurt", "sushi"]}
];

/* for loop to add all db entries */
for (var place in all_restaurants){
  var value = all_restaurants[place];
  Restaurant.findOneAndUpdate( value, {}, {upsert: true}, function(err, doc){
  /*  console.log( "test err: " + err);
    console.log( "test doc: " + doc);*/
  });
}
console.log("Database done updating Restaurants.");
/* *************** */


function mongoGet( name, callBack ){
    console.log( "mongoGet: " + name );
    profile_model.find({"name": name}, function (err, result) {
        console.log( "result of find: " + result);
        if (err !== null) {
           console.log("ERROR: " + err);
           callBack({"food_category": null, "meal_time": null, "goal_meal": null, "price": null});
           return;
       }
       if( result.length > 0 ) callBack({"food_category": result[0].food_category, "meal_time": result[0].meal_time, "goal_meal": result[0].goal_meal, "price": result[0].price});
       else callBack({"food_category": null});
       }
  );
}


function mongoGetRestaurant( body, callBack ){ 
    console.log( "mongoGetRestaurant, body: " + JSON.stringify( body ));
    if( body !== undefined){
        if (body.food_category !== "0" && body.price !== "0" && body.meal_time !== "0"){
            Restaurant.find({"food_category": body.food_category, "price": body.price, "meal_time": body.meal_time}, function (err, result) {
            console.log( "result of find: " + JSON.stringify(result)); //result is a list of objects
            if (err !== null) { //An error has occured
               console.log("ERROR: " + err);
               callBack({"message": "no match"});
               return;
               //callBack({"food_category": null, "meal_time": null, "goal_meal": null, "price": null});
            } else {
              console.log("LALALALALLALA");
              callBack({"message": "match", "restaurant_name": result[0].restaurant_name})
              return;
            }
           //if( result.length > 0 ) callBack({"food_category": result[0].food_category, "meal_time": result[0].meal_time, "goal_meal": result[0].goal_meal, "price": result[0].price});
          // else callBack({"food_category": null});
          });
        } else if(body.food_category !== "0" && body.price !== "0"){
          Restaurant.find({"food_category": body.food_category, "price": body.price}, function (err, result) {
            console.log( "result of find: " + JSON.stringify(result)); //result is a list of objects
            if (err !== null) { //An error has occured
               console.log("ERROR: " + err);
               callBack({"message": "no match"});
               return;
               //callBack({"food_category": null, "meal_time": null, "goal_meal": null, "price": null});
            } else {
              console.log("LALALALALLALA");
              callBack({"message": "match", "restaurant_name": result[0].restaurant_name})
              return;
            }
          });
        } else if(body.food_category !== "0" && body.meal_time !== "0"){
            Restaurant.find({"food_category": body.food_category, "meal_time": body.meal_time}, function (err, result) {
              console.log( "result of find: " + JSON.stringify( result )); //result is a list of objects
              if (err !== null) { //An error has occured
                 console.log("ERROR: " + err);
                 callBack({"message": "no match"});
                 return;
                 //callBack({"food_category": null, "meal_time": null, "goal_meal": null, "price": null});
              } else {
                console.log("LALALALALLALA");
                callBack({"message": "match", "restaurant_name": result[0].restaurant_name})
                return;
              }
            });
        } else if(body.price !== "0" && body.meal_time !=="0"){
           Restaurant.find({"price": body.price, "meal_time": body.meal_time}, function (err, result) {
              console.log( "result of find: " + JSON.stringify( result )); //result is a list of objects
              if (err !== null) { //An error has occured
                 console.log("ERROR: " + err);
                 callBack({"message": "no match"});
                 return;
                 //callBack({"food_category": null, "meal_time": null, "goal_meal": null, "price": null});
              } else {
                console.log("LALALALALLALA");
                callBack({"message": "match", "restaurant_name": result[0].restaurant_name})
                return;
              }
            });
         } else if(body.food_category !== "0"){
            Restaurant.find({"food_category": body.food_category}, function (err, result) {
                console.log( "result of find: " + JSON.stringify( result )); //result is a list of objects
                if (err !== null) { //An error has occured
                   console.log("ERROR: " + err);
                   callBack({"message": "no match"});
                   return;
                   //callBack({"food_category": null, "meal_time": null, "goal_meal": null, "price": null});
                } else {
                  console.log("LALALALALLALA");
                  callBack({"message": "match", "restaurant_name": result[0].restaurant_name})
                  return;
                }
            });
         } else if(body.price !== "0"){
            Restaurant.find({"price": body.price}, function (err, result) {
                  console.log( "result of find: " + JSON.stringify( result )); //result is a list of objects
                  if (err !== null) { //An error has occured
                     console.log("ERROR: " + err);
                     callBack({"message": "no match"});
                     return;
                     //callBack({"food_category": null, "meal_time": null, "goal_meal": null, "price": null});
                  } else {
                    console.log("LALALALALLALA");
                    callBack({"message": "match", "restaurant_name": result[0].restaurant_name})
                    return;
                  }
              });
         } else if(body.meal_time !=="0"){
            Restaurant.find({"meal_time": body.meal_time}, function (err, result) {
                  console.log( "result of find: " + JSON.stringify( result )); //result is a list of objects
                  if (err !== null) { //An error has occured
                     console.log("ERROR: " + err);
                     callBack({"message": "no match"});
                     return;
                     //callBack({"food_category": null, "meal_time": null, "goal_meal": null, "price": null});
                  } else {
                    console.log("LALALALALLALA");
                    callBack({"message": "match", "restaurant_name": result[0].restaurant_name})
                    return;
                  }
              });
         } else {
          console.log("ERROR with finding.");
         }
 
    } else {
      console.log("Error.");
    }
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
  "saveProfile": mongoSave,
  "getRestaurant": mongoGetRestaurant
};