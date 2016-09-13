var express = require('express');
var router = express.Router();

var models = require('../../server/models/index');

/* CREATE a room */
router.post('/', function(req, res, next) {
  console.log(req.body);
  models.Toilet.create({
    floor: req.body.floor,
    gender: req.body.gender,
    pendingRequests: req.body.pendingRequests || toilet.pendingRequests
  }).then(function(room) {
    res.json(room);
  });
});

/* GET toilets listing. */
router.get('/', function(req, res, next) {
  models.Toilet.findAll({
    include: [{
      model: models.Room,
      as: 'Rooms',
      attributes: ['id', 'ToiletId', 'locked', 'updatedAt']
    }]
  }).then(function (rooms) {
    res.json(rooms);
  });
});

/* GET a single toilet */
router.get('/:id(\\d+)', function(req, res, next) {
  models.Toilet.find({
    where: {
      id: req.params.id
    }
  }).then(function (toilet) {
    res.json(toilet);
  });
});

/* UPDATE a toilet */
router.put('/:id', function(req, res, next) {
  models.Toilet.find({
    where: {
      id: req.params.id
    }
  }).then(function (toilet) {
    if (toilet) {
      toilet.updateAttributes({
        floor: req.body.floor || toilet.floor,
        gender: req.body.gender || toilet.gender,
        pendingRequests: req.body.pendingRequests || toilet.pendingRequests
      }).then (function (toilet) {
        req.json(toilet);
      })
    }
  });
});

/* DELETE a single toilet */
router.delete('/:id', function(req, res, next) {
  models.Toilet.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(toilet) {
    res.json(toilet);
  });
});

module.exports = router;
