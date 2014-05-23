
var express = require("express"),
    http = require("http"),
    connect = require("connect"),  //npm install connect
    login_handlers = require("./login_routes.js"),
    port = process.env.PORT || 3000,  //this is new
    app = express();

var cookie_options = {};  //{ 'httpOnly': true, 'signed': true };

app.use(connect.urlencoded());  //this allows req.body

// set up a static file directory to use for default routing
app.use(express.static(__dirname + "/client"));

app.use(connect.cookieParser('S3CRE7'));  //to be used if signing

http.createServer(app).listen(port);
console.log("Express is listening on port " + port);

//routes for login page (index.html)

app.get("/login.json", login_handlers.loginHandler);

app.post("/register.json", login_handlers.registerHandler);

//routes for main app page (foods.html)

var food_handlers = require("./food_routes.js");

app.get("/retrieve.json", 
    function(res, req){ 
    	food_handlers.retrieveProfileHandler( res, req); });

app.post("/save.json", food_handlers.saveProfileHandler);

app.get("/foods", food_handlers.reloadFoods);


