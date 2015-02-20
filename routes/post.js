var data = require("../myEvents.json");

exports.post = function(req, res) {    
	// Your code goes here
	console.log(data);
	console.log("Hello");
	res.render('post',data);
   
 }