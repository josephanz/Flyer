/*
  Initializes a local Mongo database
  on local machine for development work.
  IMPORTANT: Make sure 'local_database_name'
  variable name matches in app.js  Otherwise the wrong 
  database will be initialized.
*/

var mongoose = require('mongoose');
var models   = require('./models');

// Connect to the Mongo database
//var local_database_name = 'flyerdb';
var database_uri  = 'mongodb://rschneiderman379:LennyLulu3@ds045531.mongolab.com:45531/heroku_app33950252'
mongoose.connect(database_uri);

//load JSON data
var events_json = require('./myEvents.json');

//remove all existing documents
models.event
	.find()
	.remove()
	.exec(onceClear);

//load data from the JSON file
function onceClear(err) {
	if(err) console.log(err);

	//loop over the projects, construct and save an object from each one
	var to_save_count = myEvents_json.length;
	for(var i=0; i<myEvents_json.length; i++) {
		var jsonEvent = myEvents_json[i];
		var eve = new models.event(jsonEvent);

		eve.save(function(err, eve) {
			if(err) console.log(err);

			to_save_count--;
			console.log(to_save_count + ' left to save!');
			if(to_save_count <= 0) {
				console.log('DONE!');

				mongoose.connection.close()
			}
		});
	}
}
