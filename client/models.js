
//each name is unique
var UserSchema = {
	name: {type: String, unique: true }, 
	//max_monthly: Number,
	//history: [String],
	//current_providers: [String]
	book_title: String,
	book_author: String,
	book_genre: String,
	recently_read: [String]	//like history
};

//defualt user is null because they have to login
var UserModel = {
	name: null, 
	// max_monthly: null,
	// history: null,
	// current_providers: null,
	book_title: null,
	book_author: null,
	book_genre: null,
	recently_read: null,
	get: function( field ){ 
		if( this[field] === undefined ) console.error("field error " + field);
		return this[field];},
	set: function( field, value ){	//set = field name and value u want to set it 
		//set is bad fix this....
		if( this[field] === undefined ) console.error("field error " + field);
		return console.error("error");	},
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

//for testing
if( sessionStorage.getItem('name' === undefined) sessionStorage.setItem('name', 'foobar'));

//test cases
// UserModel.set( name: sessionStorage.getItem( 'name' )); //client cookie = session
// UserModel.set( "history": ['diabetes'] );
// UserModel.setAll({max_monthly: 200, current_providers: []});

// TEST CASES FOR BOOKS
UserModel.set( name: sessionStorage.getItem( 'name' )); //client cookie = session
UserModel.set( "recently_read": ['Catcher and the Rye', ''] );
UserModel.setAll({book_title: "Catcher and the Rye", book_author: "Emily Goodwin", book_genre: "syfy"});