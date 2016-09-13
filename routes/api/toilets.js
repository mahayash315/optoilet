var express = require('express');
var router = express.Router();

var models = require('../../server/models/index');
var search = require('../../domain/toilet/search');

//===== CRUD ==================================================================
/* CREATE a room */
router.post('/', function(req, res, next) {
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
router.put('/:id(\\d+)', function(req, res, next) {
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
router.delete('/:id(\\d+)', function(req, res, next) {
  models.Toilet.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(toilet) {
    res.json(toilet);
  });
});
//=============================================================================



//===== BUSINESS ==============================================================
/* Pend a single toilet */
router.post('/:id(\\d+)/pend', function(req, res, next) {
  req.json("{}");
});

/* Search toilets */
router.get('/search', function(req, res, next) {
  // validation
  if (!req.query.current_floor) throw new Error("Missing query parameter 'current_floor'");
  if (!req.query.gender) throw new Error("Missing query parameter 'gender'");

  // search
  search(req.query.current_floor, req.query.gender).then(function (result) {
    res.json(result);
  });
});

//=============================================================================

module.exports = router;
