var models = require('../../server/models/index');


/** トイレを評価する */
function cost(toilet, currentFloor, direction) {

    var floor = toilet.floor;
    var allRooms = toilet.Rooms.length;
    var emptyRooms = toilet.Rooms.filter(function(room) { return (!room.locked); }).length;
    var pendingRequests = toilet.pendingRequests;

    var alpha = 1.0;
    var beta = 1.0;
    var gamma = 1.0;

    var cost = 0;
    cost += 1.0 * (allRooms - emptyRooms);
    cost += alpha * (pendingRequests - emptyRooms);
    cost += beta * Math.abs(currentFloor - floor);
    cost += gamma * (direction * 1.0 / ((currentFloor - floor) || 1.0));

    return cost;
}

var search = function(gender, currentFloor, direction) {
    // validation
    if (!gender) throw new Error("gender is undefined");
    if (!currentFloor) throw new Error("currentFloor is undefined");
    if (!direction) direction = 0;
    else if (direction > 0) direction = 1;
    else if (direction < 0) direction = -1;

    return models.Toilet.findAll({
        where: {
            gender: gender
        },
        include: [{
            model: models.Room,
            as: 'Rooms',
            attributes: ['id', 'ToiletId', 'locked', 'updatedAt']
        }]
    }).then(function(toilets) {

        // 各トイレの最適度を評価する
        var costs = {};
        toilets.forEach(function(toilet) {
            costs[toilet.id] = cost(toilet, currentFloor, direction);
        });

        return {
            toilets: toilets,
            costs: costs
        };
    });
};


module.exports = search;