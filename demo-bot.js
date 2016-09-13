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

function unpendToilet(toilet, callback) {
    // pend
    return request
        .delete(baseUrl+'/api/toilets/'+toilet.id+'/pend')
        .end(function(err, res) {
            if (err) console.error(err.message);
            callback();
        })
}



var Agent = function(name, gender) {
    // constructor
    this.name = name;
    this.gender = gender;
    this.toilet = null;
    this.room = null;
};

Agent.prototype.chooseToilet = function() {
    var self = this;

    var options = toilets.filter(function (toilet) { return (toilet.gender == self.gender); });
    return options[Math.floor(Math.random() * options.length)];
};

Agent.prototype.occupyToilet = function(callback) {
    var self = this;

    this.toilet = this.chooseToilet();
    var emptyRooms = this.toilet.Rooms.filter(function (room) { return (!room.locked); });
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
            unpendToilet(this.toilet, function() {
                console.log(self.name + ' left toilet ' + self.toilet.id);
                self.toilet = null;
                callback();
            });
        }
    } else {
        callback();
    }

};


function init(callback) {
    agents.push(new Agent('太鼓 穂高', 'male'));
    agents.push(new Agent('池滝 一智', 'male'));
    agents.push(new Agent('末次 紘之', 'male'));
    agents.push(new Agent('綿本 政直', 'male'));
    agents.push(new Agent('渕之上 拓', 'male'));
    agents.push(new Agent('山方 孝哉', 'male'));
    agents.push(new Agent('大守 嘉仁', 'male'));
    agents.push(new Agent('成影 俊太', 'male'));
    agents.push(new Agent('日野田 忠', 'male'));
    agents.push(new Agent('荊尾 圭治', 'male'));
    agents.push(new Agent('寿司 和平', 'male'));
    agents.push(new Agent('戸 崇義', 'male'));
    agents.push(new Agent('十亀 秀博', 'male'));
    agents.push(new Agent('藺牟田 義', 'male'));
    agents.push(new Agent('高綱 輝政', 'male'));
    agents.push(new Agent('種子野 暁', 'male'));
    agents.push(new Agent('濱端 善規', 'male'));
    agents.push(new Agent('余頃 光樹', 'male'));
    agents.push(new Agent('八重幡 翔', 'male'));
    agents.push(new Agent('鷹西 英吾', 'male'));
    agents.push(new Agent('大柄 顕太', 'male'));
    agents.push(new Agent('山砥 慶洋', 'male'));
    agents.push(new Agent('竹綱 悠策', 'male'));
    agents.push(new Agent('長櫓 佳邦', 'male'));
    agents.push(new Agent('菅 盛男', 'male'));
    agents.push(new Agent('西形 勝弘', 'male'));
    agents.push(new Agent('下垣内 尚', 'male'));
    agents.push(new Agent('田寺 好治', 'male'));
    agents.push(new Agent('野別 由也', 'male'));
    agents.push(new Agent('蓬 美晴', 'male'));
    agents.push(new Agent('牛玖 通博', 'male'));
    agents.push(new Agent('川奈部 和', 'male'));
    agents.push(new Agent('越名 真輝', 'male'));
    agents.push(new Agent('角木 彰典', 'male'));
    agents.push(new Agent('久島 俊一', 'male'));
    agents.push(new Agent('淡海 鷹也', 'male'));
    agents.push(new Agent('式澤 正茂', 'male'));
    agents.push(new Agent('土阪 禎一', 'male'));
    agents.push(new Agent('連山 由人', 'male'));
    agents.push(new Agent('三軒 周悟', 'male'));
    agents.push(new Agent('三丸 雷', 'male'));
    agents.push(new Agent('港屋 譲一', 'male'));
    agents.push(new Agent('淀屋 史憲', 'male'));
    agents.push(new Agent('銅金 龍', 'male'));
    agents.push(new Agent('河内野 練', 'male'));
    agents.push(new Agent('地頭 郁人', 'male'));
    agents.push(new Agent('曲沼 逸樹', 'male'));
    agents.push(new Agent('霧咲 恭也', 'male'));
    agents.push(new Agent('矢延 宗司', 'male'));
    agents.push(new Agent('福澄 一教', 'male'));
    agents.push(new Agent('今東 朋宣', 'male'));
    agents.push(new Agent('石田尾 聡', 'male'));
    agents.push(new Agent('圓入 尚一', 'male'));
    agents.push(new Agent('下見 成寿', 'male'));
    agents.push(new Agent('志茂野 邦', 'male'));

    agents.push(new Agent('金子 綾花', 'female'));
    agents.push(new Agent('橋口 沙也佳', 'female'));
    agents.push(new Agent('大和田 真代', 'female'));
    agents.push(new Agent('矢崎 玲菜', 'female'));
    agents.push(new Agent('川辺 夏帆', 'female'));
    agents.push(new Agent('羽鳥 裕里', 'female'));
    agents.push(new Agent('池谷 ゆうか', 'female'));
    agents.push(new Agent('樫原 恵理佳', 'female'));
    agents.push(new Agent('白須 久江', 'female'));
    agents.push(new Agent('大植 都子', 'female'));
    agents.push(new Agent('牛久 結菜', 'female'));
    agents.push(new Agent('福里 初恵', 'female'));
    agents.push(new Agent('上西 紗千', 'female'));
    agents.push(new Agent('大溝 紗妃', 'female'));
    agents.push(new Agent('長本 由加理', 'female'));
    agents.push(new Agent('門奈 祐佳', 'female'));
    agents.push(new Agent('奥畑 るな', 'female'));
    agents.push(new Agent('塩谷 摩紀', 'female'));
    agents.push(new Agent('黒河内 美音', 'female'));
    agents.push(new Agent('竹倉 裕実', 'female'));
    agents.push(new Agent('小坪 奈里', 'female'));
    agents.push(new Agent('瀧波 哲子', 'female'));
    agents.push(new Agent('柴岡 万美', 'female'));
    agents.push(new Agent('曲田 愛実', 'female'));
    agents.push(new Agent('曽雌 菊江', 'female'));
    agents.push(new Agent('小檜山 靜', 'female'));
    agents.push(new Agent('陣野 慈子', 'female'));
    agents.push(new Agent('光藤 静菜', 'female'));
    agents.push(new Agent('唐 勝江', 'female'));
    agents.push(new Agent('浮田 麻姫', 'female'));
    agents.push(new Agent('竹端 桃江', 'female'));
    agents.push(new Agent('溝呂木 共子', 'female'));
    agents.push(new Agent('近衛 由理恵', 'female'));
    agents.push(new Agent('道城 奈々緒', 'female'));
    agents.push(new Agent('梶栗 春果', 'female'));
    agents.push(new Agent('笈沼 あぐり', 'female'));
    agents.push(new Agent('鯉谷 ココ', 'female'));
    agents.push(new Agent('東坂 麻利亜', 'female'));
    agents.push(new Agent('横屋 美結', 'female'));
    agents.push(new Agent('鵜瀬 林', 'female'));
    agents.push(new Agent('見並 三智', 'female'));
    agents.push(new Agent('三平 千治', 'female'));
    agents.push(new Agent('木島 よう', 'female'));
    agents.push(new Agent('桐野 真粧美', 'female'));
    agents.push(new Agent('手小 久実', 'female'));
    agents.push(new Agent('間根山 明子', 'female'));
    agents.push(new Agent('六本 稔恵', 'female'));
    agents.push(new Agent('足高 なほみ', 'female'));
    agents.push(new Agent('谷永 杏華', 'female'));
    agents.push(new Agent('吉ノ薗 麻江', 'female'));
    agents.push(new Agent('漆田 友紀枝', 'female'));
    agents.push(new Agent('腰丸 映莉子', 'female'));
    agents.push(new Agent('荒清 千泰', 'female'));
    agents.push(new Agent('四十万谷 華寿美', 'female'));
    agents.push(new Agent('平垣内 百加', 'female'));
    agents.push(new Agent('城戸 裕華', 'female'));
    agents.push(new Agent('腮尾 歩奈美', 'female'));
    agents.push(new Agent('純浦 なつの', 'female'));
    agents.push(new Agent('長穂 眞知', 'female'));
    agents.push(new Agent('蔦岡 紋美', 'female'));
    agents.push(new Agent('羽方 もえこ', 'female'));
    agents.push(new Agent('重川 和花菜', 'female'));
    agents.push(new Agent('薗村 黒', 'female'));
    agents.push(new Agent('濵端 ミワ', 'female'));
    agents.push(new Agent('松濱 望希', 'female'));
    agents.push(new Agent('千先 暁燕', 'female'));
    agents.push(new Agent('内形 純乃', 'female'));
    agents.push(new Agent('泰地 ソラ', 'female'));
    agents.push(new Agent('沢地 萌以', 'female'));
    agents.push(new Agent('琴羽 実帆子', 'female'));
    agents.push(new Agent('越永 貴未', 'female'));
    agents.push(new Agent('福岳 ヨリ子', 'female'));
    agents.push(new Agent('谷下澤 鮎未', 'female'));
    agents.push(new Agent('伊比井 梨央奈', 'female'));
    agents.push(new Agent('安松谷 未沙貴', 'female'));
    agents.push(new Agent('本河 丹奈', 'female'));
    agents.push(new Agent('塔村 品子', 'female'));
    agents.push(new Agent('立河 さらら', 'female'));
    agents.push(new Agent('虎岡 万友佳', 'female'));
    agents.push(new Agent('牛方 友馨', 'female'));
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


init();
loop();