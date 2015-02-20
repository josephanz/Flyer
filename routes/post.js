var data = require("../myEvents.json");
var data2 = require("../takeAwalk.json");
exports.myEvents = function(req, res) {    
	// Your code goes here
	console.log(data);
	console.log("Hello");
	var host = req.query.name;
    var title = req.query.title;
    var date = req.query.date;
    var startTime = req.query.starttime;
    var endTime = req.query.endtime;
    var desc = req.query.description;
	
	var newEvent ={
			"org": host,
			"title": title,
			"time": startTime,
			"date": date,
			"description": desc,
			"imageURL": "http://www.mysnowparks.com/sites/default/files/images/250x250.png"
		};

	console.log(newEvent);
	if(host !== undefined){
		console.log("Entered");
		data["myEvents"].push(newEvent);
		data2["takeAwalk"].push(newEvent);
	}

	res.render('post',data);
   
 }