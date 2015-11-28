/**
 * Created by rts on 28/11/15.
 */
var geohash = require("ngeohash");
module.exports = Map;


function Map(lat, lng) {
    this.center = {lat: lat, lng: lng};
    this.elements = [];
    this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.center,
        zoom: 11
    });

}


Map.prototype.addPicture = function (hash, photo) {
    var bounds = geohash.decode_bbox(hash);
    var imageBounds = {
        north: bounds[2],
        south: bounds[0],
        east: bounds[3],
        west: bounds[1]
    };
    var pic = new google.maps.GroundOverlay(
        photo,
        imageBounds, {
            opacity: 0.5
        });
    pic.setMap(this.map);
    this.elements.push(pic);
};

Map.prototype.getSize = function () {
    this.map.getBounds();
};

Map.prototype.setCenter = function(hash) {
    var x = geohash.decode(hash);
    this.map.panTo({lat : x.latitude, lng : x.longitude});
};