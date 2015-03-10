
/**
 * Module dependencies.
 */
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var flash = require('connect-flash');
var passport = require('passport');
var passportLocal = require('passport-local');
var bCrypt = require('bcrypt-nodejs');
var User = require('./models/user');
//var Event = require('./models/event');
var models = require('./models.js');
var dbConfig = require('db.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

var index = require('./routes/index');
var myLife = require('./routes/myLife');
var takeAwalk = require('./routes/takeAwalk');
var takeAwalk2 = require('./routes/takeAwalk2');
var post = require('./routes/post');
var myPosts = require('./routes/myPosts');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(_dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());

app.use(flash());

app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ cookieName: 'session', secret: 'keyboard cat', resave: false, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

//authentication function
passport.use( 'login', new passportLocal.Strategy( { passReqToCallback : true }, 
	function(req, username, password, done) {
	//check if username exists in mongo
	User.findOne({ 'username' : username },
		function(err, user) {
			//some error happened with database
			if(err)
				return done(err);
			//username does not exist in mongo
			if(!user){
				console.log('User not found with username' + username);
				return done(null, false, req.flash('message', 'User Not found.'));
			}
			//username exists, bad password
			if(user.password != password) {
				console.log('Invalid password!');
				return done(null, false, { message: 'Invalid password!' });
			}
			//successful authentication
			//req.session.user = user;
			return done(null, user);
		}
	);
}));

//registration function
passport.use('register', new passportLocal.Strategy({ passReqToCallback : true }, 
	function(req, username, password, done) {
			User.findOne({ 'username' : username }, function(err, user) {
				//server side error
				if(err) {
					console.log('Registration error: ' + err);
					return done(err);
				}
				//user already exists in database
				if (user) {
					console.log('User already exists');
					return done(null, false, req.flash('message', 'User already exists!'));
				}
				else {
					//no user with that email, create on in the database
					console.log('Creating new user');
					var newUser = new User();
					newUser.username = username;
					newUser.password = password;
					newUser.email = req.param('email');
					newUser.firstName = req.param('firstName');
					newUser.lastName = req.param('lastName');

					//save new user in database
					newUser.save(function(err) {
						//server side error with saving
						if(err) {
							console.log('Error in saving user:' + err);
							throw err;
						}
						console.log('User registration successful');
						return done(null, newUser);
					});
				}
			});
}));

/*app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    User.findOne({ email: req.session.user.email }, function(err, user) {
    	console.log('doin stuff');
      if (user) {
        req.user = user;
        //delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});*/

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

//query database for user by their id
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//load welcome page
app.get('/', function(req, res) {
	res.render('index', {
		isAuthenticated: req.isAuthenticated(),
		user: req.user
	});
});

//load login page
app.get('/login', function(req, res) {
	res.render('login');
});

//if password is wrong, notify user
app.get('/loginPassword', function(req, res) {
	res.render('loginPassword');
});

//user already exists in database, redirect to login
app.get('/registerFailure', function(req, res) {
	res.render('registerFailure');
});

//run authentication function
app.post('/login', passport.authenticate('login', {
	successRedirect: '/myLife',
	failureRedirect: '/loginPassword',
	failureFlash : true
}));

//if password is wrong, run authentication function again
app.post('/loginPassword', passport.authenticate('login', {
	successRedirect: '/myLife',
	failureRedirect: '/loginPassword',
	failureFlash : true
}));

//load registration page
app.get('/register', function(req, res) {
	res.render('register');
});

//run registration function
app.post('/register', passport.authenticate('register', {
	successRedirect: '/myLife',
	failureRedirect: '/registerFailure',
	failureFlash: true
}));

//user already exists, run authentication function
app.post('/registerFailure', passport.authenticate('login', {
	successRedirect: '/myLife',
	failureRedirect: '/loginPassword',
	failureFlash: true
}));

//load logout page
app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

//load all user's posted events
app.get('/myPosts', function(req, res) {
	console.log('VIEWING POSTS');
	models.event
		.find({"hostname": req.user.username})
		.sort('date')
		.exec(renderEvents);

	function renderEvents(err, events) {
		//console.log(events);
		res.render('myPosts', {'events': events});
	}
});

//load posting form page
app.get('/post', function(req, res) {
	res.render('post');
});

//load page after creating new event
//app.get('/post/new', post.addEvent);
app.get('/post/new', function(req, res) {
	var name = req.query.name;
	var title = req.query.title;
	var date = req.query.date;
	var starttime = req.query.starttime;
	var endtime = req.query.endtime;
	var description = req.query.description;
	var location = req.query.location;
	var selectors = req.query.selectors;
	//var image = req.query.image;
	
	
 

	var newEvent = new models.event({
		"hostname": name, 
		"title": title,
		"date": date,
		"starttime": starttime,
		"endtime": endtime,
		"tags": selectors,
		"location": location,
		"description": description,
		//"imageURL": image
	});

	//view the newly created event form
	newEvent.save(afterSaving);
	function afterSaving(err, events){
		if(err) console.log(err);
		res.send(500);
		res.redirect('myPosts')
	}
});

//load page after removing an event from myPosts
app.post('/myPosts/:eventID/delete', function(req, res) {
	var eventID = req.params.eventID;
	console.log(req.params.eventID);
	console.log('REMOVING EVENT')
	models.event
		.find({"_id": eventID})
		.remove()
		.exec(afterRemoving)

	function afterRemoving(err, events) {
		if(err) console.log(err);
		res.send();
	}
});

app.get('/myLife', function(req, res) {
	models.event
		.find({"participants": req.user.username})
		.sort('date')
		.exec(renderEvents);

	function renderEvents(err, events) {
		//console.log(events);
		res.render('myLife', {'events': events});
	}
});

app.post('/myLife/:eventID/remove', function(req, res) {
	var eventID = req.params.eventID;
	models.event
		.update(
			{"_id" : eventID},
			{ $pop: { "participants" : req.user.username}}
		)
		.exec(renderEvents);

	function renderEvents(err, events) {
		//console.log(events);
		res.render('myLife', {'events': events});
	}
});

//app.get('/takeAwalk', takeAwalk.takeAwalk);
app.get('/takeAwalk', function(req, res) {
	console.log("SHOULD SHOW ALL EVENTS");
	models.event
		.find()
		.sort('date')
		.exec(renderEvents);

	function renderEvents(err, events) {
		//console.log(events);
		res.render('takeAwalk', {'events': events});
	}
});

app.post('/takeAwalk/:eventID', function(req, res) {
	var eventID = req.params.eventID;
	console.log(req.params.eventID);
	models.event
		//.find({"_id": eventID})
		.update(
			{"_id" : eventID},
			{ $push: { "participants" : req.user.username}}
		)
		.exec(renderEvents)

	function renderEvents(err, events) {
		//console.log(events);
		res.render('takeAwalk', {'events': events});
	}
});

//THIS IS ALL STUFF THAT I DON'T KNOW WHAT IT DOES, 
//PROBABLY A BAD IDEA TO COMMENT IT OUT BUT WHATEVER
//app.post('/myPosts', post.addEvent);
app.get('/myLife', myLife.addFriend);
//app.get('/myPosts', post.addEvent);
//app.get('/myPosts', function(req, res) {
//	res.render('myPosts');
//});
app.get('/takeAwalk', takeAwalk.takeAwalk);
app.get('/takeAwalk2', takeAwalk2.takeAwalk2);

//app.post('/takeAwalk', takeAwalk.filterEvent);

//allows us to view on localhost
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
