var models = require('../../server/models/index');


var search = function(currentFloor, gender) {
    // validation
    if (!currentFloor) throw new Error("currentFloor is undefined");
    if (!gender) throw new Error("gender is undefined");

    return models.Toilet.findAll({
        where: {
            gender: 'female'
        }
    })
};


module.exports = search;