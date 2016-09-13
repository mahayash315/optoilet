
function createToilets() {
    var toilets = [];

    var id = 1;
    var floor = 1;
    for (var i = 0; i < 41; i++) {
        toilets.push({
            id: id++,
            floor: floor,
            gender: "female",
            pendingRequests: 0,
            createdAt: "2016-09-13T04:25:15.000Z",
            updatedAt: "2016-09-13T04:25:15.000Z"
        });
        toilets.push({
            id: id++,
            floor: floor,
            gender: "male",
            pendingRequests: 0,
            createdAt: "2016-09-13T04:25:15.000Z",
            updatedAt: "2016-09-13T04:25:15.000Z"
        });

        floor++;
    }

    return toilets;
}


function createRooms() {
    var toilets = createToilets();
    var rooms = [];

    var id = 1;
    toilets.forEach(function(toilet) {
        rooms.push({
            id: id++,
            ToiletId: toilet.id,
            locked: false
        });
        rooms.push({
            id: id++,
            ToiletId: toilet.id,
            locked: false
        });
        rooms.push({
            id: id++,
            ToiletId: toilet.id,
            locked: false
        });
        rooms.push({
            id: id++,
            ToiletId: toilet.id,
            locked: false
        });

        if (toilet.gender == 'female') {
            rooms.push({
                id: id++,
                ToiletId: toilet.id,
                locked: false
            });
        }
    });

    console.log(rooms);
}


// createToilets();
createRooms();