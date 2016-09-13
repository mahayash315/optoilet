'use strict';
module.exports = function(sequelize, DataTypes) {
  var Room = sequelize.define('Room', {
    ToiletId: DataTypes.INTEGER,
    locked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    updated_at: DataTypes.TIME
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Room.belongsTo(models.Toilet)
      }
    }
  });
  return Room;
};