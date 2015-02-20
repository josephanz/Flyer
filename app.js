
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

var dbConfig = require('db.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

var index = require('./routes/index');
var myLife = require('./routes/myLife');
var takeAwalk = require('./routes/takeAwalk');
var post = require('./routes/post');

var app = express();

// all environments
//app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
//app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
//app.use(express.methodOverride());
//app.use(express.cookieParser('Intro HCI secret key'));
//app.use(express.session());
//app.use(app.router);
//app.use(express.static(path.join(__dirname, 'public')));

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(expressSession({ 
//	secret: 'laptopcat',
//	resave: false,
//	saveUninitialized: false
//	}));

//app.use(passport.initialize());
//app.use(passport.session());

app.use(flash());

app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

passport.use( 'login', new passportLocal.Strategy( { passReqToCallback : true }, 
	function(req, username, password, done) {
	//done(null, user) -> user authenticated correctly
	//done(null, null) -> user does not exist or did not authenticate correctly
	//done(new Error('something went wrong!')) -> something went wrong on our end

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
			if(!isValidPassword(username, password)) {
				console.log('Invalid password!');
				return done(null, false, { message: 'Invalid password!' });
			}
			//successful authentication
			return done(null, user);
		}
		);
}));

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

var isValidPassword = function( username, password ) {
	//NEED TO IMPLEMENT: actual password check
	return true;
};

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

//NEED TO IMPLEMENT: query database against id stored in the session
passport.deserializeUser(function(id, done) {
	//query database or cache here instead of the garbage below
	//done(null, { id: id, name: id });
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

//local authentication only verifies username and password once and then creates a UserID as a way to 
//	authenticate from then on
app.post('/login', passport.authenticate('login', {
	//res.redirect('myLife');
	successRedirect: '/myLife',
	failureRedirect: '/login',
	failureFlash : true
}));

app.get('/register', function(req, res) {
	res.render('register');
});

app.post('/register', passport.authenticate('register', {
	successRedirect: '/myLife',
	failureRedirect: '/register',
	failureFlash: true
}));

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.get('/myLife',myLife.addFriend);
app.get('/post', post.post);
app.get('/takeAwalk', takeAwalk.takeAwalk);

//for development only
app.listen(3000);
