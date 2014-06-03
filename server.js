/* 
* Holly Brice & Heidi Niu 
* CIS 399: Final Project
*/
var express = require("express"),
    http = require("http"),
    connect = require("connect"),  //npm install connect
    login_handlers = require("./login_routes.js"),
    port = process.env.PORT || 3000,  //this is new
    app = express();

console.log("server.js - Connecting server.");
var cookie_options = {};  //{ 'httpOnly': true, 'signed': true };

app.use(connect.urlencoded());  //this allows req.body

// set up a static file directory to use for default routing
app.use(express.static(__dirname + "/client"));

app.use(connect.cookieParser('S3CRE7'));  //to be used if signing

http.createServer(app).listen(port);
console.log("Express is listening on port " + port);

//routes for login page (index.html)
console.log("server.js - app.get /login.json.");
app.get("/login.json", login_handlers.loginHandler);

console.log("server.js - app.post /register.json.");
app.post("/register.json", login_handlers.registerHandler);

//routes for main app page (foods.html)

console.log("server.js - creating food_handlers");
var food_handlers = require("./client/js/restaurants_routes.js"); //i moved the restaurant into client

console.log("server.js - app.get /restrive.json.");
app.get("/retrieve.json", function(res, req){ 
    	food_handlers.retrieveProfileHandler( res, req); });

/*console.log("server.js - app.get /retrieveRest.json.");
app.get("/retrieveRest.json", function(res, req){ 
    	food_handlers.retrieveRestaurantHandler( res, req); });*/

console.log("server.js - app.get /retrieveRest.json.");
app.post("/retrieveRest.json", food_handlers.retrieveRestaurantHandler );

console.log("server.js - app.post /save.json.");
app.post("/save.json", food_handlers.saveProfileHandler);

// app.get("/places.json", food_handlers.reloadFoods);


