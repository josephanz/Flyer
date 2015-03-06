//var data = require("../myEvents.json");
/*var models = require('../models.js');

//get post page!
exports.view = function(req, res) {
	console.log(req.userName);
	console.log('VIEWING POSTS');
	models.event
		.find({"title": "Party"})
		.sort('date')
		.exec(renderEvents);

	function renderEvents(err, events) {
		//console.log(events);
		res.render('myPosts', {'events': events});
	}
};

exports.removeEvent = function(req, res) {
	var eventID = req.params.id;
	console.log(req.body);
	console.log('REMOVING EVENT')
	models.event
		.find({"_id": eventID})
		.remove()
		.exec(afterRemoving)

	function afterRemoving(err, events) {
		if(err) console.log(err);
		res.send();
		//res.render('myLife');
	}
};*/