/**
 * Created by rts on 28/11/15.
 */
var Map = require("./Map2");
var geohash = require("ngeohash");
var EyeEmClient = require("./EyeEmClient");
var client = new EyeEmClient("fd0fcd5c0bf15d7c88896f18960a338f579f3fb1");
var lat = 52.518912, lng = 13.401765;
client.fetchPictures(lat, lng)
    .then(function (pic) {
        console.log(pic);
    });
var map = new Map(lat, lng);

var addPicture = function (loc, offset) {
    var coords = geohash.decode(loc);
    client.fetchPictures(coords.latitude, coords.longitude)
        .then(function (pic) {
            console.log(loc, pic.thumbUrl);
            map.addPicture(loc, pic.thumbUrl);
            //map.setCenter(loc);
        })
        .catch(function (err) {
            console.log(err);
        });

};


var dir = 3;
var sameSteps = 0, stepWidth = -1, changeIn = 2;
var nextField = function (step) {
    if (++sameSteps > stepWidth) {
        dir = (dir + 1) % 4;
        sameSteps = 0;
        if (--changeIn == 0) {
            changeIn = 2;
            stepWidth++;
        }
    }
    switch (dir) {
        case 0:
            pos = geohash.neighbor(pos, [0, 1]);
            break;
        case 1:
            pos = geohash.neighbor(pos, [1, 0]);
            break;
        case 2:
            pos = geohash.neighbor(pos, [0, -1]);
            break;
        case 3:
            pos = geohash.neighbor(pos, [-1, 0]);
            break;
    }
}
var pos = geohash.encode(lat, lng, 4);

var visited = {};
var i;

var loop = setInterval(function () {
    i++;
    nextField(i);
    addPicture(pos, i);
    clearInterval(loop);
}, 200);


