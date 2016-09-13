var vm = new Vue({
    el: '#list',
    data: {
        toilets: [
            {
                "id": 1,
                "floor": 1,
                "gender": "female",
                "pendingRequests": 0,
                "createdAt": "2016-09-13T04:25:15.000Z",
                "updatedAt": "2016-09-13T04:25:15.000Z",
                "Rooms": [
                    {
                        "id": 1,
                        "ToiletId": 1,
                        "locked": true,
                        "updatedAt": "2016-09-13T04:37:40.000Z"
                    }
                ]
            },
            {
                "id": 2,
                "floor": 2,
                "gender": "male",
                "pendingRequests": 0,
                "createdAt": "2016-09-13T04:25:21.000Z",
                "updatedAt": "2016-09-13T04:25:21.000Z",
                "Rooms": [
                    {
                        "id": 2,
                        "ToiletId": 1,
                        "locked": true,
                        "updatedAt": "2016-09-13T04:37:40.000Z"
                    },
                    {
                        "id": 3,
                        "ToiletId": 1,
                        "locked": false,
                        "updatedAt": "2016-09-13T04:37:40.000Z"
                    }
                ]
            }
        ]
    },
    created: function() {
        // API call
        $.ajax({
            method: 'GET',
            url: '//localhost:3000/api/toilets'
        })
        .done(function(data) {
            vm.toilets = data
                .filter(function (toilet) { return (toilet.gender === 'male'); })
                .reverse();
        })
        .fail(function() {
            alert('load failed');
        });
    },
    methods: {
        used: function(toilet) {
            var u = 0;
            $.each(toilet.Rooms, function(i, room) {
                if (room.locked) u += 1;
            });
            return u;
        },
        smooth: function(toilet) {
            var u = this.used(toilet);
            var s = toilet.Rooms.length;

            var r = s - u;
            var p = toilet.pendingRequests;

            return (r > p);
        },
        toBin: function(toilet) {
            var s = '';
            $.each(toilet.Rooms, function(i, room) {
                s += (room.locked) ? '1' : '0';
            });
            return s;
        },
        reserve: function(id) {
            var $e = $('#collapse-' + id + ' button');
            $e.attr('disabled', 'disabled');
            // API call
            $.ajax({
                method: 'POST',
                url: '//localhost:3000/api/toilets/' + id + '/pend'
            })
            .done(function(data) {
                this.toilets = data;
            })
            .fail(function() {
                alert('failed');
                $e.removeAttr('disabled');
            });
        }
    }
});
Vue.filter('male', function(toilet) {
    return toilet.gender === 'male';
});
