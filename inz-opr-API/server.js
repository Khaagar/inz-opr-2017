var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var objects = require('./routes/objects');
var reservations = require('./routes/reservations');
var sportsfields = require('./routes/sportsfields');

var port = 3000;

var cors=require('cors');
var app = express();
app.use(cors());

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', users);
app.use('/api', sportsfields);
app.use('/api', objects);
app.use('/api', reservations);
app.listen(port, function(){
    console.log('Server started on port '+port);
});