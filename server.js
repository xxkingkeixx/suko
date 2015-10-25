var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var favicon = require('serve-favicon');
var session = require('express-session');
var nodemailer = require('nodemailer');
var compression = require('compression');
var timeout = require('connect-timeout');
var csrf = require('csurf')
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');

var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();
var engines = require('consolidate');

//config
  app.use(cookieParser('sokutvisgoingtobesecure'));
  app.use(bodyParser());
  app.use(session());
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session({secret: 'sokutv-!@#$%^&*()(*&^%$#@'}));
  //app.use(csrf())
  app.enable('view cache');
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.enable('trust proxy');
  app.engine('html', engines.ejs);
  app.use(express.static(__dirname + '/public'));
//end config



// passport config
//var Account = require('./models/account');
//passport.use(new LocalStrategy(Account.authenticate()));
//passport.serializeUser(Account.serializeUser());
//passport.deserializeUser(Account.deserializeUser());

// passport config
var Account = require('./models/account');
//passport.use(new LocalStrategy(Account.authenticate()));
passport.use(new LocalStrategy(function(username, password, done) {
  Account.findOne({ username: username }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    user.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  });
}));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());



//see if user is loged in?
function loggedin(req,res){
    if (req.user) {
      return true;
    } else {
        res.redirect('/');
    }
}

// database connection
mongoose.connect('mongodb://suko:suko@kahana.mongohq.com:10074/suko-tv');


app.get('/', function(req, res){

   if (req.user) {
       res.redirect('/dashboard');
   }

  res.render('intro', {});

});

app.get('/dashboard', function(req, res){
    loggedin(req,res);
    res.render('index', {});

});

app.get('/login', function(req,res){
    res.render('login',{user : req.user, error: req.flash('error')[0]});
});

app.post('/login', passport.authenticate('local',{failureRedirect: '/login', failureFlash: true}), function(req, res) {

    res.redirect('/dashboard');

});

app.get('/signup', function(req,res){
    var err = "";
    res.render('signup',{error: err});
});

app.post('/signup', function(req,res){

    Account.register(new Account({ username : req.body.username, countrie: req.body.countrie , email: req.body.email, password: req.body.password }), req.body.password, function(err, account) {
        if (err) {
            return res.render('signup', { account : account, error: err });
        }

        passport.authenticate('local')(req, res, function () {
            //res.redirect('/dashboard');
            res.redirect('/settings');
        });
    });


});

app.get('/settings',function(req,res){
 res.render('settings', {});
})

app.get('/episode',function(req,res){
 res.render('episode', {});
})
app.get('/episode-grid',function(req,res){
 res.render('episode-grid', {});
})
app.get('/episode-full',function(req,res){
 res.render('episode-full', {});
})
app.get('/contact',function(req,res){
 res.render('contact', {});
})
app.get('/blog',function(req,res){
 res.render('blog', {});
})

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});





//heartbeat monitor (status page)
app.get('/ping', function(req, res){
    res.send("pong!", 200);
});

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;


var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
})

