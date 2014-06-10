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
    url: String
   // goal_meal: String //ie. fried rice
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
  url: [String]
});

var RestaurantModel = {
  restaurant_name: null,
  meal_time: null,
  food_category: null,
  price: null,
  url: null,
  getAll: function(restaurant_name, meal_time, food_category, price, url ){
    //trying to match all Restaurants that match any of these statemnts
    Restaurant.find({ $or: [ { meal_time: meal_time}, {food_category: food_category}, {price: price}, {url: url} ]}, function(err, result){
      console.log("restaurant.js - RESULT: " + JSON.stringify( result ));
    });
  }
};

var Restaurant = mongoose.model("Restaurant", RestaurantSchema);

/* Restaurant entry for DB */
var all_restaurants = [
  {"restaurant_name": "Caspian", "meal_time": ["breakfast", "lunch", "dinner"], "food_category": ["mediterranean", "american"], "price": "min", "url": "https://www.facebook.com/pages/Caspian-Mediterranean-Restaurant/111705075531826"},
  {"restaurant_name": "Rennies Landing", "meal_time": ["breakfast", "lunch", "dinner"], "food_category": ["pubfood", "american"], "price": "min", "url": "https://www.facebook.com/rennies.landing"},
  {"restaurant_name": "Qdoba", "meal_time": ["breakfast", "lunch", "dinner"], "food_category": ["mexican"], "price": "min", "url": "http://www.qdobaoregon.com/content/qdoba-eugene"},
  {"restaurant_name": "East Meets West", "meal_time": ["lunch", "dinner"], "food_category": ["asian"], "price": "min", "url": "https://www.facebook.com/pages/East-Meets-West-Chinese/132321093581938?rf=167969593267462"},
  {"restaurant_name": "Glenwood", "meal_time": ["breakfast", "lunch", "dinner"], "food_category": ["american", "asian"], "price": "med", "url": "https://www.facebook.com/pages/Glenwood-Restaurants/19201926194"},
  {"restaurant_name": "Webfoot Bar and Grill", "meal_time": ["breakfast", "lunch", "dinner"], "food_category": ["american", "pubfood"], "price": "med", "url": "https://www.facebook.com/TheWebfootBar"},
  {"restaurant_name": "Alder Street Fish Co", "meal_time": ["lunch", "dinner"], "food_category": ["american"], "price": "med", "url": "https://www.facebook.com/AlderStreetFishCo"},
  {"restaurant_name": "Sweet Basil Express", "meal_time": ["lunch", "dinner"], "food_category": ["thai"], "price": "min", "url": "http://sweetbasilexpress.com/"},
  {"restaurant_name": "DairyQueen", "meal_time": ["lunch", "dinner", "dessert"], "food_category": ["american"], "price": "min", "url": "http://www.dairyqueen.com/us-en/Locator/Detail/5237"},
  {"restaurant_name": "DoughCo", "meal_time": ["lunch", "dinner"], "food_category": ["italian"], "price": "min",  "url" : "http://www.doughco.com/"},
  {"restaurant_name": "Pegasus Pizza", "meal_time": ["lunch", "dinner"], "food_category": ["italian"], "price": "med", "url": "http://www.pegasuspizza.net/"},
  {"restaurant_name": "Porcellino Bistro", "meal_time": ["lunch", "dinner"], "food_category": ["italian", "american"], "price": "med", "url": "http://porcellinobistroeugene.com/"},
  {"restaurant_name": "Sys Pizza", "meal_time": ["lunch", "dinner"], "food_category": ["italian"], "price": "min", "url": "http://www.sysnewyorkpizza.com/"},
  {"restaurant_name": "Taylors Bar and Grill", "meal_time": ["breakfast", "lunch", "dinner"], "food_category": ["pubfood", "american"], "price": "min", "url": "https://www.facebook.com/taylorsducks?rf=203017669712388"},
  {"restaurant_name": "Evergreen Indian Restaurant", "meal_time": ["lunch", "dinner"], "food_category": ["asian"], "price": "med", "url": "http://www.evergreenindianrestaurant.com/"},
  {"restaurant_name": "Cafe Siena", "meal_time": ["breakfast", "lunch"], "food_category": ["american", "mexican"], "price": "min", "url": "https://www.facebook.com/pages/Cafe-Siena/115325685153016"},
  {"restaurant_name": "Wild Duck Cafe", "meal_time": ["breakfast", "lunch", "dinner"], "food_category": ["american", "italian"], "price": "med", "url": "http://www.wildduckcafe.net/"},
  {"restaurant_name": "Track Town Pizza", "meal_time": ["lunch", "dinner"], "food_category": ["italian"], "price": "max", "url": "http://www.tracktownoncampus.com/"},
  {"restaurant_name": "Excelsior Inn and Risorante Italiano", "meal_time": ["breakfast", "lunch", "dinner"], "food_category": ["italian"], "price": "max", "url": "http://excelsiorinn.com/"},
  {"restaurant_name": "Noodle Head", "meal_time": ["lunch", "dinner"], "food_category": ["asian"], "price": "min", "url": "http://noodleheadeugene.com/"},
  {"restaurant_name": "Cafe Seoul", "meal_time": ["lunch", "dinner"], "food_category": ["asian"], "price": "min", "url": "https://local.yahoo.com/info-22016772-cafe-seoul-eugene"},
  {"restaurant_name": "Maple Garden", "meal_time": ["lunch", "dinner"], "food_category": ["asian"], "price": "min", "url": "http://www.eugenemaplegarden.com/"},
  {"restaurant_name": "Teriyaki Boy", "meal_time": ["lunch", "dinner"], "food_category": ["asian"], "price": "min", "url": "http://www.yellowbook.com/profile/teriyaki-boy_1867280834.html"},
  {"restaurant_name": "Barrys Espresso", "meal_time": ["breakfast", "lunch", "dessert"], "food_category": ["american"], "price": "min", "url": "http://barrysbakery.blogspot.com/"},
  {"restaurant_name": "Yogurt Extreme", "meal_time": ["dessert"], "food_category": ["american"], "price": "min", "url": "http://www.yogurtextreme.com/"},
  {"restaurant_name": "Milky Way", "meal_time": ["breakfast", "lunch"], "food_category": ["american", "asian"], "price": "min", "url": "https://www.facebook.com/pages/Milky-Way/100862929958710"},
  {"restaurant_name": "Peachwave", "meal_time": ["dessert", "lunch", "dinner"], "food_category": ["american, asian"], "price": "min", "url": "http://www.peachwaveyogurt.com/locations/oregon/"}
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

/* This goes back to retrieveRestaurantHandler in restaurant_routes.js - it will return a restaurant name */
function mongoGetRestaurant( body, callBack ){ 
    console.log( "mongoGetRestaurant, body: " + JSON.stringify( body ));
    if( body !== undefined){
        var food_category = body.food_category;
        var price = body.price;
        var meal_time = body.meal_time;
        var len;
        var randomNum;
        console.log(food_category, price, meal_time);
        /* IF - all selectors have input it in them from places.html */
        if (body.food_category !== "0" && body.price !== "0" && body.meal_time !== "0"){
            /* Find - based on all 3 categories */
            Restaurant.find({"food_category": body.food_category, "price": body.price, "meal_time": body.meal_time}, function (err, result) {
            console.log( "result of find: " + JSON.stringify(result)); //result is a list of objects
            if (err !== null) { //An error has occured
               console.log("ERROR: " + err);
               callBack({"message": "no match"});
               return;
            } else {
              console.log("A");
              len = result.length;
              console.log("length of result is: " + JSON.stringify( len ));
              /* IF - no match was returned, check for less matches */
              if (len === 0){ // no match for all 3 entries
                console.log("NO MATCH. Check for less.");
                //check 2 entries
                Restaurant.find({"food_category": body.food_category, "price": body.price}, function (err, result) {
                  console.log( "result of find: " + JSON.stringify( result )); //result is a list of objects
                  if (err !== null) { //An error has occured
                     console.log("ERROR: " + err);
                     callBack({"message": "no match"});
                     return;
                  } else {
                    console.log("AA");
                    len = result.length;
                    console.log("length of result is: " + JSON.stringify( len ));
                    if( len === 0 ){ 
                    // check 1 entry
                        Restaurant.find({"food_category": body.food_category}, function (err, result) {
                            console.log( "result of find: " + JSON.stringify( result )); //result is a list of objects
                            if (err !== null) { //An error has occured
                               console.log("ERROR: " + err);
                               callBack({"message": "no match"});
                               return;
                            } else {
                              console.log("E");
                              len = result.length;
                              console.log("length of result is: " + JSON.stringify( len ));
                              if( len === 0 ){  
                              //check a differnt 1 entry category
                                Restaurant.find({"price": body.price}, function (err, result) {
                                    console.log( "result of find: " + JSON.stringify(result)); //result is a list of objects
                                    if (err !== null) { //An error has occured
                                       console.log("ERROR: " + err);
                                       callBack({"message": "no match"});
                                       return;
                                    } else {
                                      console.log("B");
                                      len = result.length;
                                      console.log("length of result is: " + JSON.stringify( len ));
                                      if( len === 0){ 
                                      //check the last category
                                          Restaurant.find({"meal_time": body.meal_time}, function (err, result) {
                                          console.log( "result of find: " + JSON.stringify(result)); //result is a list of objects
                                          if (err !== null) { //An error has occured
                                             console.log("ERROR: " + err);
                                             callBack({"message": "no match"});
                                             return;
                                          } else {
                                            console.log("B");
                                            len = result.length;
                                            if(len === 0){
                                              console.log("Error.");
                                              return;
                                            }
                                            console.log("length of result is: " + JSON.stringify( len ));
                                            randomNum = Math.floor(Math.random() * len); // picks a random number out of restraunts listed
                                            callBack({"message": "match", "restaurant_name": result[randomNum].restaurant_name, "url": result[randomNum].url});
                                            return;
                                          }
                                        });
                                      }else{
                                         randomNum = Math.floor(Math.random() * len); // picks a random number out of restraunts listed
                                      callBack({"message": "match", "restaurant_name": result[randomNum].restaurant_name, "url": result[randomNum].url});
                                      return;
                                      }
                                    }
                                  });
                              } else {
                                randomNum = Math.floor(Math.random() * len); // picks a random number out of restraunts listed
                                callBack({"message": "match", "restaurant_name": result[randomNum].restaurant_name, "url": result[randomNum].url}); 
                                return;
                              }
                            }
                        });
                    } else { // 2 entry return
                        randomNum = Math.floor(Math.random() * len); // picks a random number out of restraunts listed
                        callBack({"message": "match", "restaurant_name": result[randomNum].restaurant_name, "url": result[randomNum].url});
                        return;
                    }
                  }
                });
              } else { // all entries match return restaurant
                  console.log("all entries match");
                  randomNum = Math.floor(Math.random() * len); // picks a random number out of restraunts listed
                  console.log(randomNum);
                  callBack({"message": "match", "restaurant_name": result[randomNum].restaurant_name, "url": result[randomNum].url});
                  return;
              }
            }
          }); /* ELSE IF - if 1 entry was not given input */
        } else if(body.food_category !== "0" && body.price !== "0"){
          Restaurant.find({"food_category": body.food_category, "price": body.price}, function (err, result) {
            console.log( "result of find: " + JSON.stringify(result)); //result is a list of objects
            if (err !== null) { //An error has occured
               console.log("ERROR: " + err);
               callBack({"message": "no match"});
               return;
               //callBack({"food_category": null, "meal_time": null, "goal_meal": null, "price": null});
            } else {
              console.log("B");
              len = result.length;
              console.log("length of result is: " + JSON.stringify( len ));

              if (len === 0) { //no results match both criteria
                console.log("no perfect matches found");
                rand = 1+ Math.floor(Math.random() * 2); //decide to find entry that matches category or price
            
                if (rand === 1) { //even number
                  Restaurant.find({"price": body.price}, function (err, result) {
                    if (err !== null) { //An error has occured
                       console.log("ERROR: " + err);
                       callBack({"message": "no match"});
                       return;
                    } else {
                      len = result.length;
                      randomNum = Math.floor(Math.random() * len); // picks a random number out of restraunts listed
                      callBack({"message": "match", "restaurant_name": result[randomNum].restaurant_name, "url": result[randomNum].url});
                      return;
                    }
                  });
                }
                
                else { //rand === 2
                  Restaurant.find({"food_category": body.food_category}, function (err, result) {
                    if (err !== null) { //An error has occured
                       console.log("ERROR: " + err);
                       callBack({"message": "no match"});
                       return;
                    } else {
                      len = result.length;
                      randomNum = Math.floor(Math.random() * len); // picks a random number out of restraunts listed
                      callBack({"message": "match", "restaurant_name": result[randomNum].restaurant_name, "url": result[randomNum].url});
                      return;
                    }
                  });
                }
              }
              else {
                randomNum = Math.floor(Math.random() * len); // picks a random number out of restraunts listed
                callBack({"message": "match", "restaurant_name": result[randomNum].restaurant_name, "url": result[randomNum].url});
                return;
              }
            }
          });  /* ELSE IF - if 1 entry was not given input */
        } else if(body.food_category !== "0" && body.meal_time !== "0"){
            Restaurant.find({"food_category": body.food_category, "meal_time": body.meal_time}, function (err, result) {
              console.log( "result of find: " + JSON.stringify( result )); //result is a list of objects
              if (err !== null) { //An error has occured
                 console.log("ERROR: " + err);
                 callBack({"message": "no match"});
                 return;
                 //callBack({"food_category": null, "meal_time": null, "goal_meal": null, "price": null});
              } else {
                console.log("C");
                len = result.length;
                console.log("length of result is: " + JSON.stringify( len ));

                if (len === 0) { //no results match both criteria
                  console.log("no perfect matches found");
                  rand = 1+ Math.floor(Math.random() * 2); //decide to find entry that matches category or mealtime
                  console.log("RANDOM" + rand);
                  console.log("RAND%2 :" + rand%2);
                  if (rand === 1) { //even number
                    Restaurant.find({"meal_time": body.meal_time}, function (err, result) {
                      if (err !== null) { //An error has occured
                         console.log("ERROR: " + err);
                         callBack({"message": "no match"});
                         return;
                      } else {
                        len = result.length;
                        randomNum = Math.floor(Math.random() * len); // picks a random number out of restraunts listed
                        callBack({"message": "match", "restaurant_name": result[randomNum].restaurant_name, "url": result[randomNum].url});
                        return;
                      }
                    });
                  }
                  
                  else { //rand === 2
                    Restaurant.find({"food_category": body.food_category}, function (err, result) {
                      if (err !== null) { //An error has occured
                         console.log("ERROR: " + err);
                         callBack({"message": "no match"});
                         return;
                      } else {
                        len = result.length;
                        randomNum = Math.floor(Math.random() * len); // picks a random number out of restraunts listed
                        callBack({"message": "match", "restaurant_name": result[randomNum].restaurant_name, "url": result[randomNum].url});
                        return;
                      }
                    });
                  }
                } 
                else { //matching result found
                  randomNum = Math.floor(Math.random() * len); // picks a random number out of restraunts listed
                  callBack({"message": "match", "restaurant_name": result[randomNum].restaurant_name, "url": result[randomNum].url});
                  return;
                }
              }
            });  /* ELSE IF - if 1 entry was not given input */
        } else if(body.price !== "0" && body.meal_time !=="0"){
           Restaurant.find({"price": body.price, "meal_time": body.meal_time}, function (err, result) {
              console.log( "result of find: " + JSON.stringify( result )); //result is a list of objects
              if (err !== null) { //An error has occured
                 console.log("ERROR: " + err);
                 callBack({"message": "no match"});
                 return;
                 //callBack({"food_category": null, "meal_time": null, "goal_meal": null, "price": null});
              } else {
                console.log("D");
                len = result.length;
                console.log("length of result is: " + JSON.stringify( len ));

                if (len === 0) { //no results match both criteria
                  console.log("no perfect matches found");
                  rand = 1+ Math.floor(Math.random() * 2); //decide to find entry that matches price or mealtime
                  if (rand === 1) { 
                    Restaurant.find({"meal_time": body.meal_time}, function (err, result) {
                      if (err !== null) { //An error has occured
                         console.log("ERROR: " + err);
                         callBack({"message": "no match"});
                         return;
                      } else {
                        len = result.length;
                        randomNum = Math.floor(Math.random() * len); // picks a random number out of restraunts listed
                        callBack({"message": "match", "restaurant_name": result[randomNum].restaurant_name, "url": result[randomNum].url});
                        return;
                      }
                    });
                  }
                  
                  else { //rand === 2
                    Restaurant.find({"price": body.price}, function (err, result) {
                      if (err !== null) { //An error has occured
                         console.log("ERROR: " + err);
                         callBack({"message": "no match"});
                         return;
                      } else {
                        len = result.length;
                        randomNum = Math.floor(Math.random() * len); // picks a random number out of restraunts listed
                        callBack({"message": "match", "restaurant_name": result[randomNum].restaurant_name, "url": result[randomNum].url});
                        return;
                      }
                    });
                  }
                } 
                else {
                  randomNum = Math.floor(Math.random() * len); // picks a random number out of restraunts listed
                  callBack({"message": "match", "restaurant_name": result[randomNum].restaurant_name, "url": result[randomNum].url});
                  return;
                }
              }
            });  /* ELSE IF - if 2 entries was not given input */
         } else if(body.food_category !== "0"){
            Restaurant.find({"food_category": body.food_category}, function (err, result) {
                console.log( "result of find: " + JSON.stringify( result )); //result is a list of objects
                if (err !== null) { //An error has occured
                   console.log("ERROR: " + err);
                   callBack({"message": "no match"});
                   return;
                   //callBack({"food_category": null, "meal_time": null, "goal_meal": null, "price": null});
                } else {
                  console.log("E");
                  len = result.length;
                  console.log("length of result is: " + JSON.stringify( len ));
                  randomNum = Math.floor(Math.random() * len); // picks a random number out of restraunts listed
                  callBack({"message": "match", "restaurant_name": result[randomNum].restaurant_name, "url": result[randomNum].url});         
                  return;
                }
            }); /* ELSE IF - if 2 entries was not given input */
         } else if(body.price !== "0"){
            Restaurant.find({"price": body.price}, function (err, result) {
                  console.log( "result of find: " + JSON.stringify( result )); //result is a list of objects
                  if (err !== null) { //An error has occured
                     console.log("ERROR: " + err);
                     callBack({"message": "no match"});
                     return;
                     //callBack({"food_category": null, "meal_time": null, "goal_meal": null, "price": null});
                  } else {
                    console.log("F");
                    len = result.length;
                    console.log("length of result is: " + JSON.stringify( len ));
                    randomNum = Math.floor(Math.random() * len); // picks a random number out of restraunts listed
                    callBack({"message": "match", "restaurant_name": result[randomNum].restaurant_name, "url": result[randomNum].url});
                    return;
                  }
              }); /* ELSE IF - if 2 entries was not given input */
         } else if(body.meal_time !=="0"){
            Restaurant.find({"meal_time": body.meal_time}, function (err, result) {
                  console.log( "result of find: " + JSON.stringify( result )); //result is a list of objects
                  if (err !== null) { //An error has occured
                     console.log("ERROR: " + err);
                     callBack({"message": "no match"});
                     return;
                     //callBack({"food_category": null, "meal_time": null, "goal_meal": null, "price": null});
                  } else {
                    console.log("G");
                    len = result.length;
                    console.log("length of result is: " + JSON.stringify( len ));
                    randomNum = Math.floor(Math.random() * len); // picks a random number out of restraunts listed
                    callBack({"message": "match", "restaurant_name": result[randomNum].restaurant_name, "url": result[randomNum].url});
                    return;
                  }
              });
         } else { /* NO ENTRIES WERE GIVEN INPUT */
          console.log("ERROR with finding.");
          callBack({"message": "no input"});
          return;
         }
 
    } else {
      console.log("Error."); //this should never reach
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