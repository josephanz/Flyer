var data = require("../myEvents.json");

exports.addFriend = function(req, res) {    
	// Your code goes here
	console.log(data);
	console.log("Hello");
	
	res.render('myLife',data);
	
 }