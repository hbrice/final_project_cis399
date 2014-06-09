/**
* Holly Brice & Heidi Niu
* CIS 399: Final Project
*/


console.log("******************************** NEW SESSION *********");
var mongoose = require("mongoose"),
    mongoUrl;
    bcrypt = require("bcrypt-nodejs"); //for encrypting password

if (process.env.VCAP_SERVICES) {
   services = JSON.parse(process.env.VCAP_SERVICES);
   console.log( "services: " + JSON.stringify( services ));
   login_mongoUrl = services["mongolab"][0].credentials.uri;
} else {
   //use this when not running on Cloud Foundry
   console.log("Using localhost/hhdb");
   mongoUrl = "mongodb://localhost/hhdb"; //creating db called hhdb (heidi/holly database)
}

mongoose.connect(mongoUrl);  //createConnection did not work here! Odd. Works in foods.js!
var db = mongoose.connection;

//db.on('open', openHandler);
db.once('open', function () {
  console.log( "moongoose login open!")});
db.on('error', console.error.bind(console, 'login connection error:'));
db.once('connecting', function () {
  console.log( "moongoose login connecting!")});
db.once('connected', function () {
  console.log( "moongoose login connection!")});
db.on('disconnecting', function () {
  console.log( "moongoose login disconnecting!")});
process.on('SIGINT', function() {
     db.close(function () {
       console.log('Mongoose disconnected through app termination');
       process.exit(0);
  });
});

console.log("login.js - creating userSchema");
/* set up new user collection: schema + model */
var UserSchema = mongoose.Schema({ 
    name: {type: String, unique : true }, //see save below
    password: String,
    question: String, //security question
    answer: String, //answer to security question
    history: [String],
    compromised: [String]
});

var User = mongoose.model("User", UserSchema);
console.log("login.js - user created.");

//need something in db for it to be defined
/* User login info */
// var query = {"name": "holly", "password": "cow", "history": ["holly"], "compromised": ["holly"]};  //add for testing
// User.findOneAndUpdate( query, {}, {upsert: true}, function(err, doc){
//     console.log( "test err: " + err);
//     console.log( "test doc: " + doc);
// });

//this tests out the "unique" key on user - should give error message second time run"
// var user1 = new User( {"name": "simon", "password": "a", "history": [], "compromised": []} );
// user1.save( function(err, doc ){
//       if (err) {
//         console.log("save error: " + JSON.stringify( err ));
//       } else {
//         console.log("doc saved: " + JSON.stringify( doc ));
//       }
//     });

//gives you messages on various db events
db.once('open', function () {
  console.log( "moongoose login open!")});
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connecting', function () {
  console.log( "moongoose login connecting!")});
db.on('connected', function () {
  console.log( "moongoose login connection!")});
db.on('disconnecting', function () {
  console.log( "moongoose login disconnecting!")});

/* expects login to be of form {name: String, password: String}
 * provides callBack with arg: {"name": bool, "password": bool} or {err: error} */
function mongoCheckExistence( login, callBack ){
    console.log( "login.js - checking existence: " + JSON.stringify( login ) );
    var name = login.name;          //assume unique
    var pass = login.password;      //not unique
    console.log("NAME: " + name);
    console.log("PASS: " + pass);
    User.findOne({"name": name}, function (err, result) {
        console.log( "existence result: " + JSON.stringify( result ));
        //find out why andy is returning null

        if (err !== null) {
           console.log("ERROR: " + err);
           callBack({"err": err});
           return;
        }
        if( result ){
          console.log("RESULT.PASSWORD: " + result.password);
          console.log("PASS: " + pass);

          bcrypt.compare(pass, result.password, function(err, isMatch) {
            if (err) return callBack(err);
            callBack({"name": true, "password": isMatch});
          });

        } else {
          //could optionally check for password match here - useful info?
          callBack({"name": false, "password": null});     //name did not match
        } 
    });
}

/* expects login to be of form {name: String, password: String}
* provides callBack with arg: {"saved": bool} or {err: error} */
function mongoRegister( login, callBack ){
  console.log("Entered login.js - mongoRegister");
  mongoCheckExistence( login, function( result ){
    if( result.err ){
         callBack({"err": result.err});  //just pass it back to callee
         return;
    }
    if( result.name ){
        callBack({"saved": false});  //exists so was not saved
    } 
    else {
        console.log("making new user. name: "+ JSON.stringify( login ));
        //Big thing to note - we are not waiting for save result before calling back to client

        //encrypt password

        //generate a salt
        bcrypt.genSalt(10, function(err, salt){
          if (err) {
            callBack({"err": err});
            return;
          }
          else {
            //hash password with salt
            bcrypt.hash(login.password, salt, null, function(err, hash) {
                if (err) {
                callBack({"err": err});
                return;
              } 
              login.password = hash;

              var user = new User( {"name": login.name, "password": login.password, "question": 
                                    login.question, "answer": login.answer, "history": [], "compromised": [] });
              console.log("USER'S SEC QUESTIONS: " + login.question);
              console.log("USER's SEC ANSWER: " + login.answer);
              user.save(function (err, doc){ 
              console.log( "register result **: " + JSON.stringify( err ) + " & " + JSON.stringify( doc));
             });
             callBack({"saved": true});
            });
          }
        });
    }
 });
}

/* expects login to be of form {name: String, password: String}
* provides callBack with arg: {"name": bool, "password": bool} or {err: error} */
function mongoLogin( login, callBack ){
  console.log("Entered login.js - mongoLogin");
  mongoCheckExistence( login, function( result ){
    if( result.err )
         callBack({"err": result.err});  //just pass it back to callee
    else
         callBack(result);  //let callee know how it matched
   });
}

function mongoPassword(login, callBack) {
  console.log("Entered login.js - mongoPassword");

  var name = login.name;
  console.log("NAME: " + name);

  User.findOne({"name": name}, function (err, result) {
    console.log( "mongoPassword result: " + JSON.stringify( result ));

    if (err !== null) {
       console.log("ERROR: " + err);
       callBack({"err": err});
       return;
    }
    if( result ){
      console.log("RESULT.QUESTION: " + result.question);
      console.log("RESULT.ANSWER: " + result.answer);
 
      if (result.question === "Q1") {
        console.log("ASK 1st Q");
        //$("#question").text( "ASK FIRST QUESTION" );
      }
      else if (result.question === "Q2") {
        //$("#question").text( "ASK SECOND QUESTION" );
      }
      else { //Q3
        //$("#question").text( "ASK 3rd QUESTION" );
      } 
      callBack(result);

    } //else {
      //could optionally check for password match here - useful info?
      //callBack({"name": false, "password": null});     //name did not match
    //} 
  });
}

module.exports = {
  "handleRegistration": mongoRegister,
  "handleLogin": mongoLogin,
  "checkExistence": mongoCheckExistence,
  "handlePassword": mongoPassword
};