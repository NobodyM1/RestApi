var express = require('express');
var bodyParser = require('body-parser');

// create express app
var app = express();

// parse requests of content-type 
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type
app.use(bodyParser.json())

var dbConfig = require('./config/database.config');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url + "items");

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function(){
    console.log("Successfully connected to the database");
})

// define a simple route
app.get('/', function(req, res){
    res.send("Hello there");
});

require('./app/routes/item.routes')(app);

// listen for requests
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});
