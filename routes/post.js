//var data = require("../myEvents.json");
/*var models = require('../models.js');

//get post page!
exports.view = function(req, res) {
	models.event
		.find()
		.sort('date')
		.exec(renderEvents);

	function renderEvents(err, events) {
		res.render('myPosts', {'events': events});
	}
};

exports.addEvent = function(req, res) {
	var name = req.query.name;
	var title = req.query.title;
	var date = req.query.date;
	var starttime = req.query.starttime;
	var endtime = req.query.endtime;
	var description = req.query.description;
	//var image = req.query.image;
	
	var newEvent = new models.event({
		"hostname": name, 
		"title": title,
		"date": date,
		"starttime": starttime,
		"endtime": endtime,
		//"categories": ,
		"description": description,
		//"image": Stringform_data.
	});

	//view the newly created event form
	newEvent.save(afterSaving);
	function afterSaving(err, events){
		if(err) console.log(err);
		res.send(500);
		res.redirect('myPosts')
	}
};*/