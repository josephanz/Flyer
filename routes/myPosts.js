//var data = require("../myEvents.json");
var models = require('../models.js');

//get post page!
exports.view = function(req, res) {
	console.log('VIEWING POSTS');
	models.event
		.find()
		.sort('date')
		.exec(renderEvents);

	function renderEvents(err, events) {
		res.render('myPosts', {'events': events});
	}
}