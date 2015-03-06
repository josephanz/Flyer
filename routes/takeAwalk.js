var data = require("../takeAwalk.json");

exports.takeAwalk = function(req, res) {
	// Your code goes here
	console.log(data);
	console.log("Hello");
	
	res.render('takeAwalk',data);
   
}

exports.filterEvent = function(req,res){
	var searchValue = req.body.selectInput;
	var index = 0;
	//create a new json object
	var JSONObj = {
		takeAwalk:[]
	};

	for(var i = 0; i < (data.takeAwalk.length);i++){
		console.log(searchValue);
		console.log(data.takeAwalk[i].description);

		if(searchValue===data.takeAwalk[i].title || searchValue===data.takeAwalk[i].date ||
			searchValue===data.takeAwalk[i].time || searchValue===data.takeAwalk[i].org){
			var item = data.takeAwalk[i];
			JSONObj.takeAwalk.push(item);
		
		}
		else{
			var lowerCaseTitle = (data.takeAwalk[i].title).toLowerCase();
			//This will search the the desciption and pick out words that match
			var split = data.takeAwalk[i].description.split(" ");
			var splitTitle = lowerCaseTitle.split(" ");
			for(var j = 0; j < (split.length); j++){
				//console.log(split[j]);
				console.log(splitTitle[j]);
				if(searchValue === split[j] || searchValue === splitTitle[j]){
					var item2 = data.takeAwalk[i];
					JSONObj.takeAwalk.push(item2);
				}

			}

		}
	};

	console.log(JSONObj);
	res.render('takeAwalk', JSONObj);
	//filterOut(JSONObj, res);
	//call filterOut on the new json object
}