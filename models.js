var mongoose = require('mongoose');

//all events stored in take a walk
var eventSchema = new mongoose.Schema({
	//fields of the event defined below
	"userWhoCreatedEvent": String,
	"hostname": String, 
	"title": String,
	"date": Date,
	"starttime": String,
	"endtime": String,
	"categories": String,
	"location": String,
	"description": String,
	//"imageURL": String,
	"tags": String,
	"participants": Array
});

var userSchema = new mongoose.Schema({
	//fields of a user profile stored in mongo are defined below
	"firstname": String, 
	"lastname": String,
	"username": String,
	"password": String,
	"email": String
});

exports.event = mongoose.model('event', eventSchema);
exports.user = mongoose.model('user', userSchema);