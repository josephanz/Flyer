var mongoose = require('mongoose');

//all events stored in take a walk
var eventSchema = new mongoose.Schema({
	//fields of the event defined below
	"hostname": String, 
	"title": String,
	"date": Date,
	"starttime": Number,
	"endtime": Number,
	"categories": String,
	"description": String,
	"image": String,
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