
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const passport = require('passport')
require('./passport-config')
var cookieSession = require('cookie-session')

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieSession({
  name: 'trail-session',
  keys: ['keys1', 'keys2']
}))

app.set('view engine','ejs')
app.use(express.urlencoded({ extended:false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnintialized: false
}))
app.use(methodOverride('_method'))

var path  = require('path') 
app.set('views', path.join(__dirname, 'views/html'))
app.use('/public', express.static('public'))

const users = []

const isLoggedIn = (req, res, next) => {
  if(req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

app.get('/', (req,res) => {
    res.render('login')
})

app.get("/images/bg.jpg", function(req, res){
  res.writeHead(200, {'Content-Type': 'images/jpeg'});
  res.end("bg.jpg");
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/index', isLoggedIn, (req,res) => {
    res.render('index')
})

app.get('/pebbleart', (req, res) => {
    res.render('pebbleart')
})

app.get('/canvaspainting', (req, res) => {
    res.render('canvaspainting')
})

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect homepage.
    res.redirect('/index');
  });


app.get('/signout', (req, res) => {
  res.redirect('/');
})

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    $(".g-signin2").css("display", "none");
    $(".data").css("display", "block");
    $("#pic").attr('src', profile.getImageUrl());
    $("#email").text(profile.getEmail());
  }
  
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      alert('User signed out');
      $(".g-signin2").css("display", "block");
      $(".data").css("display", "none");

    });
  }
  

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))

