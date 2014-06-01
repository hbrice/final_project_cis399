/**
* Holly Brice & Heidi Niu
* CIS 399: Final Project
*/

/*this is just a comment right now...  each name is unique */
var UserSchema = {
	name: {type: String, unique: true}, //ie. Bob
	meal_time: String, //ie. breakfast
	food_category: String, //ie. Thai
	price: String, //ie. $8-$15
	goal_meal: String //ie. fried rice
};

/*defualt user is null because they have to login.
if you want to put post in this file, put it in set, and setAll and remove from matcher_controller */
var UserModel = {
	name: null, 
	meal_time: null,
	food_category: null,
	price: null,
	goal_meal: null,
	get: function( field ){  //could go to server and checkto see if data is up to date
		if( this[field] === undefined ) console.error("field error " + field);
		return this[field];},
	set: function( field, value ){	//set = field name and value u want to set it 
		//set is bad fix this....
		if( this[field] === undefined ){
			console.error("field error " + field);
		} 
		return console.error();	},
	getAll: function(){
		var all_keys = Object.keys ( this );
		var model = this; //needed because of scope
		//obj is thing we are carrying and current is the immediate item we are looking at
		return all_keys.reduce( function( obj, current ){
			if( typeof ( model[current]) == 'function') return obj;
				obj[current] = model[current]; //added this field onto object and put value in
				return obj; 
		}, {/*intentionally empty */});
	},
	setAll: function( obj ){	//obj = {name: steve, meal_time: Breakfast, }
		var new_keys = Object.keys( obj ); //pass it in, pull keys off of it.
		var model = this;
		new_keys.every( function( current ){
			if( model[current] === undefined ){
				console.error("Empty field, add text");
				return true; /*false would break it*/
			} else {
				console.log("** setting all.");
				model[current] = obj[current];
				return true; /*false would break it*/
			}
		});
	}
};


/* for testing - comment out when server is running! */
//if( sessionStorage.getItem('name' === undefined)) sessionStorage.setItem('name', 'foobar');

/* TEST CASES */
// UserModel.set( 'name': sessionStorage.getItem( "name" ) ); //client cookie = session
//UserModel.set( 'goal_meal': "frozen yogurt" );
//UserModel.setAll('food_category': "American", 'meal_time': "lunch" );


// var AllRestaurants = {
// 					'the_list': []
// 					//addProvider, allProviders, findProviders, removeProvider
// 					};										
// var temp_restaurant = RestaurantModel.setAll({'name': "Yogurt Extreme", 'meal_time': ["Dessert", "Snack"], 'food_category': ["American"], 'price': "min"});

// AllRestaurants.addRestaurant( temp_retaurant );

// temp_provider = RestaurantModel.setAll({'name': 'Glenwood', 'meal_time': ["Breakfast"], 'food_category': ['American'], 'price': "med"});

// AllRestaurants.addRestaurant( temp_restaurant );

// var x = $.extend({}, RestaurantModel); //does a clone

