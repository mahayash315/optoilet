var vm = new Vue({
    el: '#list',
    data: {
        inSearch: false,
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
        ],
        costs: {
            1: 0,
            2: 3
        }
    },
    created: function() {
        var getUrlVars = function() {
            var vars = [], max = 0, hash = "", array = "";
            var url = window.location.search;
            hash  = url.slice(1).split('&');
            max = hash.length;
            for (var i = 0; i < max; i++) {
                array = hash[i].split('=');
                vars.push(array[0]);
                vars[array[0]] = array[1];
            }
            return vars;
        };
        var args = getUrlVars();
        var cf = args.currentFloor;
        var dir = args.direction;
        // API call
        if (cf) {
            this.inSearch = true;
            $.ajax({
                method: 'GET',
                url: '//localhost:3000/api/toilets/search',
                data: {
                    current_floor: cf,
                    gender: 'male',
                    direction: dir
                }
            })
            .done(function(data) {
                vm.toilets = data.toilets
                    .filter(function (toilet) { return (toilet.gender === 'male'); })
                    .reverse();
                vm.costs = data.costs;
                if (cf) {
                    var idx = -1;
                    $.each(vm.toilets, function(i, toilet) {
                        if (toilet.floor == cf) {
                            idx = toilet.id;
                        }
                    });
                    if (idx !== -1) {
                        setTimeout(function() {
                            $("html,body").animate({
                                scrollTop: $('#heading-'+idx).offset().top - 240
                            });
                            $('#heading-'+idx).parent().addClass('panel-info');
                        }, 100);
                    }
                }
            })
            .fail(function() {
                alert('load failed');
            });
        } else {
            $.ajax({
                method: 'GET',
                url: '//localhost:3000/api/toilets'
            })
            .done(function(data) {
                vm.toilets = data
                    .filter(function (toilet) { return (toilet.gender === 'male'); })
                    .reverse();
                if (cf) {
                    var idx = -1;
                    $.each(vm.toilets, function(i, toilet) {
                        if (toilet.floor == cf) {
                            idx = toilet.id;
                        }
                    });
                    if (idx !== -1) {
                        setTimeout(function() {
                            $("html,body").animate({
                                scrollTop: $('#heading-'+idx).offset().top - 240
                            });
                            $('#heading-'+idx).parent().addClass('panel-info');
                        }, 100);
                    }
                }
            })
            .fail(function() {
                alert('load failed');
            });
        }
    },
    ready: function() {
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

            if (r == 0) return false;
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
