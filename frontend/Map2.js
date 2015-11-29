/**
 * Created by rts on 28/11/15.
 */
"use strict";
var geohash = require("ngeohash");
module.exports = Map;

var OPACITY = 0.75;
function Map(lat, lng) {
    this.center = {lat: lat, lng: lng};
    this.elements = [];
    this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.center,
        zoom: 4
    });

}


Map.prototype.addPicture = function (hash, photo, cb) {
    var bounds = geohash.decode_bbox(hash);
    var loc = geohash.decode(hash);
    var imageBounds = {
        north: bounds[2],
        south: bounds[0],
        east: bounds[3],
        west: bounds[1]
    };
    //var cam = "https://api.evercam.io/v1/public/cameras/nearest/snapshot?near_to="+loc.latitude+"%2C%20"+loc.longitude+"&api_id=&api_key=";
    var pic;
    if (photo && photo.photoUrl) {
        pic = new google.maps.GroundOverlay(
            photo.photoUrl,
            imageBounds, {
                opacity: OPACITY
            });
        google.maps.event.addListener(pic, 'click', function () {
            cb(photo)
        });
    }
    else
        pic = new google.maps.Rectangle({
            bounds: imageBounds,
            fillColor: '#555555',
            fillOpacity: 0.5,
            strokeOpacity: 0,
            strokeWeight: 0
        });
    pic.setMap(this.map);
    this.elements.push(pic);
    var self = this;
};

Map.prototype.getSize = function () {
    return this.map.getBounds();
};

Map.prototype.setCenter = function (hash) {
    var x = geohash.decode(hash);
    this.map.panTo({lat: x.latitude, lng: x.longitude});
};

Map.prototype.clear = function () {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].setMap(null);
        google.maps.event.clearInstanceListeners(this.elements[i]);
    }
    this.elements.length = 0;
};

Map.prototype.getCenter = function () {
    return this.map.getCenter();
};