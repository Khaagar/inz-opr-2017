var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds247007.mlab.com:47007/inz-opr', ['objects']);


// Get All Users
router.get('/objects', function(req, res, next){
    db.objects.find(function(err, objects){
        if(err){
            res.send(err);
        }
        res.json(objects);
    });
});

// Get Single user
router.get('/object/:id', function(req, res, next){
    db.objects.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, object){
        if(err){
            res.send(err);
        }
        res.json(object);
    });
});


// Get Single object
router.get('/object/:id/name', function(req, res, next){
    db.objects.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, object){
        if(err){
            res.send(err);
        }
        res.json(object.name);
    });
});


//Save Task
router.post('/object', function(req, res, next){
    var object = req.body;
    console.log(req.body);
    if(!object.name){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.objects.save(object, function(err, object){
            if(err){
                res.send(err);
            }
            res.json(object);
        });
    }
});



// Delete Task
router.delete('/object/:id', function(req, res, next){
    db.objects.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, object){
        if(err){
            res.send(err);
        }
        res.json(object);
    });
});

// Update Task
router.put('/object/:id', function(req, res, next){
    var object = req.body;
    var updObject = {};
    
    if(object.name){
        updObject.name = object.name;
    }
    
    if(!updObject){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.objects.update({_id: mongojs.ObjectId(req.params.id)},updObject, {}, function(err, object){
        if(err){
            res.send(err);
        }
        res.json(object);
    });
    }
});

module.exports = router;