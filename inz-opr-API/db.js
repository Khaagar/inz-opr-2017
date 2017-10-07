var mongoose = require('mongoose');
bodyParser = require('body-parser');
mongoose.connect('mongodb://admin:6yhn&UJM@inzopr2017-shard-00-00-q73x0.mongodb.net:27017,inzopr2017-shard-00-01-q73x0.mongodb.net:27017,inzopr2017-shard-00-02-q73x0.mongodb.net:27017/test?ssl=true&replicaSet=InzOpr2017-shard-0&authSource=admin', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection err'));
db.once('open', function callback(){console.log('connected to db')});