/**
 * Bot for demo
 */
var request = require('superagent');

var baseUrl = 'http://localhost:3000';

var toilets = [];
var agents = [];

function getToilets(callback) {
    // get toilet list
    return request
        .get(baseUrl+'/api/toilets/')
        .end(function(err, res) {
            if (err) console.error(err.message);
            toilets = res.body;
            callback();
        })
}

function lockRoom(room, callback) {
    // update
    return request
        .put(baseUrl+'/api/rooms/'+room.id)
        .send({ locked: true })
        .end(function(err, res) {
            if (err) console.error(err.message);
            callback();
        })
}

function unlockRoom(room, callback) {
    // update
    return request
        .put(baseUrl+'/api/rooms/'+room.id)
        .send({ locked: false })
        .end(function(err, res) {
            if (err) console.error(err.message);
            callback();
        })
}

function pendToilet(toilet, callback) {
    // pend
    return request
        .post(baseUrl+'/api/toilets/'+toilet.id+'/pend')
        .end(function(err, res) {
            if (err) console.error(err.message);
            callback();
        })
}



var Agent = function(name) {
    // constructor
    this.name = name;
    this.toilet = null;
    this.room = null;
};

Agent.prototype.chooseToilet = function() {
    return toilets[Math.floor(Math.random() * toilets.length)];
};

Agent.prototype.occupyToilet = function(callback) {
    var self = this;

    this.toilet = this.chooseToilet();
    var emptyRooms = this.toilet.Rooms.filter(function (room, idx, arr) { return !room.locked });
    if (emptyRooms.length > 0) {
        this.room = emptyRooms[0];
        this.room.locked = true;
        lockRoom(this.room, function() {
            console.log(self.name + ' occupied room ' + self.room.id + ' in toilet ' + self.toilet.id);
            callback();
        });
    } else {
        this.room = null;
        pendToilet(this.toilet, function() {
            console.log(self.name + ' pended toilet ' + self.toilet.id);
            callback();
        });
    }
};

Agent.prototype.leaveToilet = function(callback) {
    var self = this;

    if (this.toilet != null) {
        if (this.room != null) {
            unlockRoom(this.room, function() {
                console.log(self.name + ' left room ' + self.room.id + ' in toilet ' + self.toilet.id);
                self.toilet = null;
                self.room = null;
                callback();
            })
        } else {
            console.log(self.name + ' left toilet ' + self.toilet.id);
            self.toilet = null;
            callback();
        }
    } else {
        callback();
    }

};


function init(callback) {
    agents.push(new Agent('太鼓 穂高'));
    agents.push(new Agent('池滝 一智'));
    agents.push(new Agent('末次 紘之'));
    agents.push(new Agent('綿本 政直'));
    agents.push(new Agent('渕之上 拓'));
    agents.push(new Agent('山方 孝哉'));
    agents.push(new Agent('大守 嘉仁'));
    agents.push(new Agent('成影 俊太'));
    agents.push(new Agent('日野田 忠'));
    agents.push(new Agent('荊尾 圭治'));
    agents.push(new Agent('寿司 和平'));
    agents.push(new Agent('戸 崇義'));
    agents.push(new Agent('十亀 秀博'));
    agents.push(new Agent('藺牟田 義'));
    agents.push(new Agent('高綱 輝政'));
    agents.push(new Agent('種子野 暁'));
    agents.push(new Agent('濱端 善規'));
    agents.push(new Agent('余頃 光樹'));
    agents.push(new Agent('八重幡 翔'));
    agents.push(new Agent('鷹西 英吾'));
    agents.push(new Agent('大柄 顕太'));
    agents.push(new Agent('山砥 慶洋'));
    agents.push(new Agent('竹綱 悠策'));
    agents.push(new Agent('長櫓 佳邦'));
    agents.push(new Agent('菅 盛男'));
    agents.push(new Agent('西形 勝弘'));
    agents.push(new Agent('下垣内 尚'));
    agents.push(new Agent('田寺 好治'));
    agents.push(new Agent('野別 由也'));
    agents.push(new Agent('蓬 美晴'));
    agents.push(new Agent('牛玖 通博'));
    agents.push(new Agent('川奈部 和'));
    agents.push(new Agent('越名 真輝'));
    agents.push(new Agent('角木 彰典'));
    agents.push(new Agent('久島 俊一'));
    agents.push(new Agent('淡海 鷹也'));
    agents.push(new Agent('式澤 正茂'));
    agents.push(new Agent('土阪 禎一'));
    agents.push(new Agent('連山 由人'));
    agents.push(new Agent('三軒 周悟'));
    agents.push(new Agent('三丸 雷'));
    agents.push(new Agent('港屋 譲一'));
    agents.push(new Agent('淀屋 史憲'));
    agents.push(new Agent('銅金 龍'));
    agents.push(new Agent('河内野 練'));
    agents.push(new Agent('地頭 郁人'));
    agents.push(new Agent('曲沼 逸樹'));
    agents.push(new Agent('霧咲 恭也'));
    agents.push(new Agent('矢延 宗司'));
    agents.push(new Agent('福澄 一教'));
    agents.push(new Agent('今東 朋宣'));
    agents.push(new Agent('石田尾 聡'));
    agents.push(new Agent('圓入 尚一'));
    agents.push(new Agent('下見 成寿'));
    agents.push(new Agent('志茂野 邦'));

    callback();
}

function loop() {
    getToilets(function () {
        var count = agents.length;
        agents.forEach(function(agent) {
            agent.leaveToilet(function() {
                agent.occupyToilet(function() {
                    count--;
                    if (count == 0) {
                        setTimeout(function() {
                            loop()
                        }, 1000);
                    }
                });
            });
        });
    });
}


init(function() {
    loop();
});