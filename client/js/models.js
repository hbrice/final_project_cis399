// this is just a comment right now... 
//each name is unique
var UserSchema = {
	name: {type: String, unique: true }, 
	max_monthly: Number,
	history: [String],
	current_providers: [String]
};

//defualt user is null because they have to login
// if you want to put post in this file, put it in set, and setAll and remove from matcher_controller
var UserModel = {
	name: null, 
	max_monthly: null,
	history: null,
	current_providers: null,
	get: function( field ){  //could go to server and checkto see if data is up to date
		if( this[field] === undefined ) console.error("field error " + field);
		return this[field];},
	set: function( field, value ){	//set = field name and value u want to set it 
		//set is bad fix this....
		if( this[field] === undefined ) console.error("field error " + field);
		return console.error();	},
	getAll: function(){
		var all_keys = Object.keys ( this );
		var model = this; //needed because of scope
		//obj is thing we are carrying and current is the immediate item we are looking at
		return all_keys.reduce( function( obj, current ){
			if( model[current] typeof 'function') return obj;
			obj[current] = model[current]; //added this field onto object and put value in
			return obj; 
		}, {/*intentionally empty */});
	},
	setAll: function( obj ){	//obj = {name: steve, max_monthly: 200}
		var new_keys = Object.keys( obj ); //pass it in, pull keys off of it.
		var model = this;
		new_keys.every( function( current ){
			if( model[current] === undefined ){
				console.error("Empty field, add text");
				return true; //false would break it
			} else {
				model[current] = obj[current];
				return true;	//false would break it
			}
		});
	}
};


//comment out when server is running!
//for testing
if( sessionStorage.getItem('name' === undefined) sessionStorage.setItem('name', 'foobar'));

//test cases
UserModel.set( name: sessionStorage.getItem( 'name' )); //client cookie = session
UserModel.set( "history": ['diabetes'] );
UserModel.setAll({max_monthly: 200, current_providers: []});

var ProviderSchema = {'name': {'unique': true, type: String}, 'min_monthly': Number, 'exclusion_list': [String]}
var ProviderModel = {'name': null,
					 'min_monthly': null,
					 'exclusion_list': [],
					 //getAll, setAll, get, set
					};
var AllProviders = {
					'the_list': [], 
					//addProvider, allProviders, findProviders, removeProvider
					};										
var temp_provider = ProviderModel.setAll({name: 'kaiser', min_monthly: 200, exclusion_list: ['diabetes']});

AllProviders.addProvider( temp_provider );

temp_provider = ProviderModel.setAll({name: 'bluecross', min_monthly: 100, exclusion_list: ['diabetes']});

AllProviders.addProvider( temp_provider );

var x = $.extend({}, ProviderModel); //does a clone








