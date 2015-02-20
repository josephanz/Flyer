
/**
 * Module dependencies.
 */
var express = require('express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
//var mongoose = require('mongoose');

var http = require('http');
var path = require('path');

var handlebars = require('express3-handlebars');

var passport = require('passport');
var passportLocal = require('passport-local');

var index = require('./routes/index');
var myLife = require('./routes/myLife');

//var Schema = mongoose.Schema;
//var ObjectId = Schema.ObjectId;

//connect to mongo
//mongoose.connect('mongodb://localhost/flyercopy');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
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

app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

passport.use( new passportLocal.Strategy(function(username, password, done) {
	//done(null, user) -> user authenticated correctly
	//done(null, null) -> user does not exist or did not authenticate correctly
	//done(new Error('something went wrong!')) -> something went wrong on our end

	//NEED TO IMPLEMENT MONGO HERE, this is the verification function right now
	if(username == password) {
		done(null, { id: username, name: username });
	}
	else {
		done(null, null);
	}
}));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

//NEED TO IMPLEMENT: query database against id stored in the session
passport.deserializeUser(function(id, done) {
	//query database or cache here instead of the garbage below
	done(null, { id: id, name: id });
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
app.post('/login', passport.authenticate('local'), function(req, res) {
	res.redirect('myLife');
});

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.get('/myLife',myLife.addFriend);

//for development only
app.listen(3000);
