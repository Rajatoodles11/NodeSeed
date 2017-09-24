
var express = require("express");  // include express module
var path = require('path');       // include path module
var app = express();                 // define our app using express
var bodyParser = require('body-parser'); //For dealing with Post Request
global.mongoose = require('mongoose');  // For DB connection
mongoose.Promise = require('bluebird'); // use to avoid depricated warning
//(node:4723) DeprecationWarning: Mongoose: mpromise (mongoose's default promise library)
// is deprecated, plug in your own promise library 
//instead: http://mongoosejs.com/docs/promises.html

var request = require('request');      //For hitting any API
// var bcrypt = require('bcrypt');       // For encrypt password during User Registration
var passwordHash = require('password-hash'); // For encrypt password during User Registration

global.router = express.Router();  // Creating a Router for routing 

app.use(express.static(__dirname + '/public')); //To include static file
app.set('views', './views'); //Set View Engine
app.set('view engine', 'ejs');

var uuid = require('node-uuid'); // generate random values is to use universally unique identifier (UUID)

// // Setting MiddleWare
// // configure app to use bodyParser(), this will let us get the data from a POST in body paramter i.e req.body.queryname
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", router); //Route Middleware . Tell the app to use route application

// // route middleware that will happen on every request
router.use(function (req, res, next) {
    // log each request to the console
    console.log("In routing Middleware");
    console.log("AP hit Method is:-", req.method);
    console.log("API Hit Url is:-", req.url);

    next();      // continue doing what we were doing and go to the route
});


// //Include Dependency of Different Model 
var User = require('./application/models/User');
console.log("User is:", User);
var UserAuthentication = require('./application/models/UserAuthentication');
console.log("UserAuthentication is:", UserAuthentication);

// //Include Depemdency of Routing
var routes = require('./configrations/routes/UserRouting.js');
console.log("Routes is:", routes);
// //Include dependency of Environment
var environment = require('./configrations/config');
console.log("Environment is:", environment);
// //Include MongoDB Dependency to start mongodb connection
global.mongooseSchema = mongoose.Schema;
var dbconnection = require('./configrations/DbConnection').getDbConnection();
// console.log("DbConnection is:-",dbconnection);


app.get('/', function (req, res) {

    res.render('index');

});

app.post('/registerUser', function (req, res) {

    console.log("In Post of Register User");
    formData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        phoneno: req.body.phoneno,
    }
    console.log("Form is", formData);
    request.post('http://localhost:8081/api/registerUser/', { form: formData }, function (error, response, body) {

        if (error) {
            console.log("Error in Getting API hit");
            throw error;
        }
        if (response.statusCode == 200 && !error) {

            console.log("Sucessfully Hit API");
            res.render('login');
        }

    });
    //  res.end("Welcome");                                            
});

app.post('/login', function (req, res) {

    var loginCredits = {
        username: req.body.username,
        password: req.body.password,
    }
    console.log("Login credits is:", loginCredits);
    // Hitting Login API
    request.post('http://localhost:8081/api/login/', { form: formData }, function (error, response, body) {

        if (error) {
            console.log("Error in Getting API hit");
            throw error;
        }
        if (response.statusCode == 200 && !error) {

            console.log("Sucessfully Hit API");
            res.render('login');
        }

    });

});

var port = process.env.Port || 8081;

app.listen(port, function () {
    console.log('Example app listening on port', port);
});

console.log("Process environment", process.env.NODE_ENV);
console.log("Welcome to app.js file");

