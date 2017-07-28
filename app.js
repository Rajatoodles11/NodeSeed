
var express = require("express");  // include express module
var path = require('path');       // include path module
var app  = express();                 // define our app using express
var bodyParser = require('body-parser'); //For dealing with Post Request
var mongoose   = require('mongoose');  // For DB connection
var request = require('request');      //For hitting any API

// configure app to use bodyParser(), this will let us get the data from a POST in body paramter i.e req.body.queryname
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var urlencoded = bodyParser.urlencoded({ extended: true });
//To include static file
app.use(express.static(__dirname + '/public'));
app.set('views', './views');
//Set View Engine
app.set('view engine', 'ejs');

// Creating a Router for routing 
global.router = express.Router();


//Include Dependency of Model 
var User = require('./application/models/User');
console.log("User is:",User);

//Require environmental variable file 

// global.locals.cfg = require();

app.get('/',function(req,res){

  res.render('index');

});


app.get('/registerUser',urlencoded,function(req,res){

        console.log("Request is ",req);
        res.end("Welcome");
        // Register User by hiting an API
});

// console.log("process argv",process.argv);
// console.log("process env",process.env.Port);

var port = process.env.Port || 8081 ;

app.listen(port, function () {
	console.log('Example app listening on port',port);
});

console.log("Process environment",process.env.NODE_ENV);
console.log("Welcome to app.js file");

