/**
 * Created by rts on 28/11/15.
 */
var Map = require("./Map2");
var geohash = require("ngeohash");
var EyeEmClient = require("./EyeEmClient");
var client = new EyeEmClient("fd0fcd5c0bf15d7c88896f18960a338f579f3fb1");
var lat = 53, lng = 12;


var map = new Map(lat, lng);

$(document).ready(function(){
    $('.button').click(function(){
        $('#fade-wrapper').fadeIn();
    });
    $('#fade-wrapper').click(function(){
        $(this).fadeOut();
    });
});

var fullScreenPic = function (photo) {
    $('#image-container').attr("src",photo.photoUrl);
    $('#fade-wrapper').fadeIn(1000);
    $('#fade-wrapper').click(function () {
        $(this).fadeOut();
        $('#image-container').attr("src","");
    });
    console.log(photo);
    $("#caption").text(photo.caption);
    $("#description").text(photo.title);
    $("#webUrl").attr("href", photo.webUrl);

};

var addPicture = function (loc, offset) {
    var coords = geohash.decode(loc);
    client.fetchPictures(coords.latitude, coords.longitude)
        .then(function (pic) {
            map.addPicture(loc, pic, function(url) {
                fullScreenPic(url);
            });
            //map.setCenter(loc);
        })
        .catch(function (err) {
            console.log(err);
        });

};


var dir;
var sameSteps, stepWidth, changeIn;
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
};
var pos = geohash.encode(lat, lng, 5);

var visited = {};
var i;

var timer;


var resetTimer = function () {
    i = 0;
    dir = 3;
    sameSteps = 0;
    stepWidth = -1;
    changeIn = 2;
    clearInterval(timer);
    var timer = setInterval(function () {
        i++;
        nextField(i);
        addPicture(pos, i);
        if (i > 1000) clearInterval(timer);
    }, 75);
};

var stopTimer = function () {
    clearInterval(timer);
};

$("#slider").slider({
    min: 1,
    max: 10,
    step: 1,
    value: 3
});

var click = function() {
    stopTimer();
    var val = $('#slider').slider("option", "value");
    map.clear();
    var coords = map.getCenter();
    pos = geohash.encode(coords.lat(), coords.lng(), val);
    console.log(coords.lat(), coords.lng(), val, pos);
    resetTimer();
};

click();

$("#test").click(function () {
   click();
});


