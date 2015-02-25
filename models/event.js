var mongoose = require('mongoose');

module.exports = mongoose.model('Event', {
	hostname: String, 
	title: String,
	date: Date,
	starttime: Number,
	endtime: Number,
	categories: String,
	description: String,
	image: String
});