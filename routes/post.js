var data = require("../myEvents.json");
//var models = require("../models/event.js");

exports.addEvent = function(req, res) {    
	// Your code goes here
	console.log(data);
	console.log("Hello");
	var name = req.query.name;
	var title = req.query.title;
	var date = req.query.date;
	var starttime = req.query.starttime;
	var endtime = req.query.endtime;
	var description = req.query.description;
	var image = req.query.image;

	var newEvent = {
  		"Host": name,
     	"title":title,
      	"date": date,
      	"starttime": starttime,
      	"endtime": endtime,
      	"description":description,
      	"image": image
      };
      console.log(newEvent);
    data["myEvents"].push(newEvent);
	res.render('post',data);
   
 }

