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

// Get Single user
router.get('/user/:id', function(req, res, next){
    db.users.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
});

router.get('/user/find/:name/:password', function(req, res, next){
    db.users.findOne({name: req.params.name}, function(err, user){
        if(user){
            if(user.password === req.params.password)
            {
                res.json({
                    type:"object",
                    object:user});
            }
            else {
                res.json({
                    type:"error",
                    object:'podane haslo jest bledne'});
            }
        }
        else {res.json({
            type:"error",
            object:'uzytkownik nie istnieje'});}
        
    });
});


// router.get('/user/findbyusername/:username', function(req, res, next){
//     var user = db.users.findOne({username: req.params.username});
//     res.json(user);
// });


// Get Single user
router.get('/user/:id/name', function(req, res, next){
    db.users.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user.name);
    });
});


//Save Task
router.post('/user', function(req, res, next){
    var user = req.body;
    console.log(req.body);
    if(!user.name || !(user.email) || !(user.password) || !(user.surname) || !(user.phone)){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        var wynik=true;
        db.users.findOne({name: req.params.name}, function(err, founduser){
            console.log(founduser);
            if(founduser){
                res.json({
                    "error": "istnieje uzytkownik o podanym loginie"});
                    wynik=false;
            }
                
            if(wynik) {
                db.users.save(user, function(err, user){
                    if(err){
                        res.send(err);
                    }
                    res.json(user);
                });
            }
            
            
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
    
    if(user.surname){
        updUser.surname = user.surname;
    }

    if(user.email){
        updUser.email = user.email;
    }

    if(user.password){
        updUser.password = user.password;
    }

    if(user.phone){
        updUser.phone = user.phone;
    }

    if(user.isAdmin){
        updUser.isAdmin = user.isAdmin;
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