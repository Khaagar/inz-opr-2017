var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds247007.mlab.com:47007/inz-opr', ['sportsfields','reservations','sportsfieldsTypes','dateTemplate']);


// Get All Users
router.get('/sportsfields', function(req, res, next){
    db.sportsfields.find(function(err, sportsfields){
        if(err){
            res.send(err);
        }
        res.json(sportsfields);
    });
});

router.get('/sportsfields/types', function(req, res, next){
    db.sportsfieldsTypes.find( function(err, sportsfields){
        if(err){
            res.send(err);
        }
        res.json(sportsfields);
    });
});

router.get('/sportsfields/dateTemplate', function(req, res, next){
    db.dateTemplate.find( function(err, sportsfields){
        if(err){
            res.send(err);
        }
        res.json(sportsfields);
    });
});

// // Get Single user
// router.get('/sportsfield/:id', function(req, res, next){
//     db.sportsfields.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, sportsfield){
//         if(err){
//             res.send(err);
//         }
//         db.reservations.find({sportsfieldId:req.params.id},function(err,reservation){
//             console.log(reservation);
//             sportsfield.reservations=reservation;
//             console.log(sportsfield);
//             res.json(sportsfield);
//         });
//     });
// });


// Get Single user
router.get('/sportsfield/:id', function(req, res, next){
    db.sportsfields.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, sportsfield){
        if(err){
            res.send(err);
        }
        res.json(sportsfield);
    });
});


//Save Task
router.post('/sportsfield', function(req, res, next){
    var sportsfield = req.body;
    console.log(req.body);
    if(!sportsfield.name || !(sportsfield.objectId) || !(sportsfield["display-name"])){
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
        res.json(sportsfield);
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

    if(sportsfield.typeName){
        updSportsfields.typeName = sportsfield.typeName;
    }

    if(sportsfield.typeDisplayName){
        updSportsfields.typeDisplayName = sportsfield.typeDisplayName;
    }

    if(sportsfield.reservations){
        updSportsfields.reservations = sportsfield.reservations;
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

// Update Task
router.put('/sportsfield/:id/:userid/reservations', function(req, res, next){
    var reservation = req.body;
    reservation.sportsfieldId = req.params.id;
    reservation.userId = req.params.userid;
    if(!(reservation)){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.sportsfields.update({_id: mongojs.ObjectId(req.params.id)},{$push:{reservations:reservation}},{}, function(err, object){
        if(err){
            res.send(err);
        }
        console.log('XYZ: ', object)
        res.json(object);
    });
    }
});

module.exports = router;