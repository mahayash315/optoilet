'use strict';
module.exports = function(sequelize, DataTypes) {
  var Toilet = sequelize.define('Toilet', {
    floor: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    pending_requests: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Toilet.hasMany(models.Room)
      }
    }
  });
  return Toilet;
};