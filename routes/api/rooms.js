var express = require('express');
var router = express.Router();

var models = require('../../server/models/index');

/* CREATE a room */
router.post('/', function(req, res, next) {
  console.log(req.body);
  models.Room.create({
    ToiletId: req.body.ToiletId,
    locked: req.body.locked || false
  }).then(function(room) {
    res.json(room);
  });
});

/* GET rooms listing. */
router.get('/', function(req, res, next) {
  models.Room.findAll({}).then(function (rooms) {
    res.json(rooms);
  });
});

/* GET a single toilet */
router.get('/:id', function(req, res, next) {
  models.Room.find({
    where: {
      id: req.params.id
    }
  }).then(function (room) {
    res.json(room);
  });
});

/* UPDATE a toilet */
router.put('/:id', function(req, res, next) {
  models.Room.find({
    where: {
      id: req.params.id
    }
  }).then(function (room) {
    if (room) {
      room.updateAttributes({
        ToiletId: req.body.ToiletId || room.ToiletId,
        locked: req.body.locked || room.locked
      }).then (function (room) {
        req.json(room);
      })
    }
  });
});

/* DELETE a single toilet */
router.delete('/:id', function(req, res, next) {
  models.Room.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(room) {
    res.json(room);
  });
});

module.exports = router;
