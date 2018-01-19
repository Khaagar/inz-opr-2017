var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds247007.mlab.com:47007/inz-opr', ['sportsfields']);


// Get All Users
router.get('/sportsfields', function(req, res, next){
    db.sportsfields.find(function(err, sportsfields){
        if(err){
            res.send(err);
        }
        res.json(sportsfields);
    });
});

// Get Single user
router.get('/sportsfield/:id', function(req, res, next){
    db.sportsfields.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, sportsfield){
        if(err){
            res.send(err);
        }
        res.json(sportsfield);
    });
});


// // Get Single user
// router.get('/sportsfield/:id/name', function(req, res, next){
//     db.users.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
//         if(err){
//             res.send(err);
//         }
//         res.json(user.name);
//     });
// });


//Save Task
router.post('/sportsfield', function(req, res, next){
    var sportsfield = req.body;
    console.log(req.body);
    if(!sportsfield.name || !(sportsfield.objectId) || !(sportsfield.dates)){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.sportsfields.save(sportsfield, function(err, sportsfield){
            if(err){
                res.send(err);
            }
            res.json(sportsfield);
        });
    }
});



// Delete Task
router.delete('/sportsfield/:id', function(req, res, next){
    db.sportsfields.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, sportsfield){
        if(err){
            res.send(err);
        }
        res.json(sportsfields);
    });
});

// Update Task
router.put('/sportsfields/:id', function(req, res, next){
    var sportsfield = req.body;
    var updSportsfields = {};
    
    
    if(sportsfield.name){
        updSportsfields.name = sportsfield.name;
    }

    if(sportsfield.objectId){
        updSportsfields.objectId = sportsfield.objectId;
    }

    if(sportsfield.dates){
        updSportsfields.dates = sportsfield.dates;
    }
    
    if(!updSportsfields){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.sportsfields.update({_id: mongojs.ObjectId(req.params.id)},updSportsfields, {}, function(err, sportsfield){
        if(err){
            res.send(err);
        }
        res.json(sportsfield);
    });
    }
});

module.exports = router;