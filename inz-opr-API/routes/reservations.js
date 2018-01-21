var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds247007.mlab.com:47007/inz-opr', ['reservations']);


// Get All Users
router.get('/reservations', function(req, res, next){
    db.reservations.find(function(err, reservations){
        if(err){
            res.send(err);
        }
        res.json(reservations);
    });
});


// Get All Users
router.get('/reservations/user/:id', function(req, res, next){
    db.reservations.find({userId: req.params.id},function(err, reservations){
        if(err){
            res.send(err);
        }
        res.json(reservations);
    });
});

// Get Single user
router.get('/reservation/:id', function(req, res, next){
    db.reservations.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, reservation){
        if(err){
            res.send(err);
        }
        res.json(reservation);
    });
});


// Get Single reservation
router.get('/reservation/:id/name', function(req, res, next){
    db.reservations.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, reservation){
        if(err){
            res.send(err);
        }
        res.json(reservation.name);
    });
});


//Save Task
router.post('/reservation', function(req, res, next){
    var reservation = req.body;
    console.log(req.body);
    if(!(reservation.sportsfieldId) || !(reservation.dateDay) || !(reservation.dateHourStart) || !(reservation.dateHourEnd) || !(reservation.userId)){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.reservations.save(reservation, function(err, reservation){
            if(err){
                res.send(err);
            }
            res.json(reservation);
        });
    }
});



// Delete Task
router.delete('/reservation/:id', function(req, res, next){
    db.reservations.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, reservation){
        if(err){
            res.send(err);
        }
        res.json(reservation);
    });
});

// Update Task
router.put('/reservation/:id', function(req, res, next){
    var reservation = req.body;
    var updreservation = {};
    
    if(reservation.objectId){
        updreservation.objectId = reservation.objectId;
    }

    if(reservation.userId){
        updreservation.userId = reservation.userId;
    }
    
    if(reservation.sportsfieldId){
        updreservation.sportsfieldId = reservation.sportsfieldId;
    }

    if(reservation.dateDay){
        updreservation.dateDay = reservation.dateDay;
    }

    if(reservation.dateHourStart){
        updreservation.dateHourStart = reservation.dateHourStart;
    }
    if(reservation.dateHourEnd){
        updreservation.dateHourEnd = reservation.dateHourEnd;
    }
    
    if(!updreservation){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.reservations.update({_id: mongojs.ObjectId(req.params.id)},updreservation, {}, function(err, reservation){
        if(err){
            res.send(err);
        }
        res.json(reservation);
    });
    }
});

module.exports = router;