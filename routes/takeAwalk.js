var data = require("../takeAwalk.json");

exports.takeAwalk = function(req, res) {
	// Your code goes here
	console.log(data);
	console.log("Hello");
	res.render('takeAwalk',data);
   
}

exports.filterEvent = function(req,res){
	var title = req.body.selectInput;
	
	console.log(data.takeAwalk.length);

	var index = 0;
	//create a new json object
	var JSONObj = {
		takeAwalk:[]
	};

	for(var i = 0; i < (data.takeAwalk.length);i++){
		console.log(title);
		console.log(data.takeAwalk[i].title);
		//if(title.indexOf(data.takeAwalk[i].title)){
		if(title==data.takeAwalk[i].title){
			//add something to the json object
			//JSONObj[index] = data.takeAwalk[i];
			var item = data.takeAwalk[i];

			JSONObj.takeAwalk.push(item);
			//index++;
			//console.log(index);
		}
		else{
			continue;
		}
	};

	console.log(JSONObj);
	res.render('takeAwalk', JSONObj);
	//filterOut(JSONObj, res);
	//call filterOut on the new json object
}