var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds247007.mlab.com:47007/inz-opr', ['users']);


// Get All Users
router.get('/users', function(req, res, next){
    db.users.find(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
});

// Get Single Task
router.get('/user/:id', function(req, res, next){
    db.users.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
});

//Save Task
router.post('/user', function(req, res, next){
    var user = req.body;
    console.log(req.body);
    if(!user.name || !(user.email)){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.users.save(user, function(err, user){
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }
});

// Delete Task
router.delete('/user/:id', function(req, res, next){
    db.users.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
});

// Update Task
router.put('/user/:id', function(req, res, next){
    var user = req.body;
    var updUser = {};
    
    if(user.name){
        updUser.name = user.name;
    }
    
    if(user.email){
        updUser.email = user.email;
    }
    
    if(!updUser){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.users.update({_id: mongojs.ObjectId(req.params.id)},updUser, {}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
    }
});

module.exports = router;