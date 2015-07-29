var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config =require('./config');

// Connect nodejs to the  DB; use mongoose. (install npm install mongoose --save)

var mongoose = require('mongoose');

// create a new instance of express object so we can use the object to run the server

var app = express();

// npm install socket.io so we have Real-Time Capabilities
// var http = require http file  .server and pass in the Express Instance of Express app.

var http = require('http').Server(app);

var io = require('socket.io')(http);

// we configured it in config.js -  now connect it to DB
mongoose.connect(config.database,function(err){
    if (err) {
        console.log(err);
    }else{
        console.log('connected to the Database');
    }
});
// 
// middleware  app.use
// extended true so any values on specific route can be images videos string
//  parse json values 
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

// use morgan so you can log all requests to the console

app.use(morgan('dev'));

// express.static is Middleware to render all 'public' static files: css anc js files

app.use(express.static(__dirname + '/public'));

var api = require('./app/routes/api')(app, express, io);

// add middleware .use ('/api' and pass in api); api is the prefix to all of the  api in the api.js file

app.use('/api', api);

app.get('*', function(req, res){
    res.sendFile(__dirname + '/public/app/views/index.html');
    
});

http.listen(config.port,function(err)   {
    if(err){
        console.log(err);
    }else{
        console.log('listening on port 3000');
    }
});