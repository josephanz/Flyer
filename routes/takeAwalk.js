var data = require("../takeAwalk.json");

exports.takeAwalk = function(req, res) {    
	// Your code goes here
	console.log(data);
	console.log("Hello");
	res.render('takeAwalk',data);
   
 }