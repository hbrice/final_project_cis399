
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
  console.log( "moongoose books open!")});
db.on('error', console.error.bind(console, 'books connection error:'));
db.once('connecting', function () {
  console.log( "moongoose books connecting!")});
db.once('connected', function () {
  console.log( "moongoose books connection!")});
db.on('disconnecting', function () {
  console.log( "moongoose books disconnecting!")});
process.on('SIGINT', function() {
     db.close(function () {
       console.log('Mongoose books disconnected through app termination');
       process.exit(0);
  });
});

var profile_schema = mongoose.Schema({ user: String, book: String, author: String, genre: Number, recommend: String });
// {user: Steve, author: Stephanie Meyers, Genre: 1, recommend: null}
var profile_model = mongoose.model("profile", profile_schema); //profile => collection profiles

//put something in db to define it.
var query = {"user": "steve", book: "The Hunger Games", author: "Stephanie Meyer", recommend: null};
profile_model.findOneAndUpdate( query, {}, {upsert: true}, function( err, doc){
                                  console.log("profile test query: " + err + " & " + doc);}
                                  );

function mongoGet( name, callBack ){
  console.log( "mongoGet: " + name );
  profile_model.find({"user": name}, function (err, result) {
    console.log( "result of find: " + result);
    if (err !== null) {
       console.log("ERROR: " + err);
       callBack({"book": null});
       return;
     }
     if( result.length > 0 ) callBack({"book": result[0].book});
      else callBack({"book": null});
     }
  );
}

//http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
function mongoSave( body, callBack ){
  console.log( "mongoGet: " + JSON.stringify( body ) );
  var query = {"user": body.user};
  profile_model.findOneAndUpdate( query, {"book": body.book}, {upsert: true, "new": true},
                     function(err, doc){ console.log( "saved: " + JSON.stringify( doc) );
                                         callBack({"error": err, "message": doc}); });
}

module.exports = {
          "getProfile": mongoGet,
          "saveProfile": mongoSave
				};