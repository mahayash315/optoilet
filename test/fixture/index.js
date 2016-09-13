'use strict';

module.exports = function (models) {
    var Promise = models.Sequelize.Promise;

    return Promise.all([
        require('./toilet')(models),
        require('./room')(models)
    ]);
};