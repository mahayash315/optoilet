'use strict';
module.exports = function(sequelize, DataTypes) {
  var Toilet = sequelize.define('Toilet', {
    floor: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    pending_requests: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Toilets.hasMany(models.Rooms)
      }
    }
  });
  return Toilet;
};