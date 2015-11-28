/**
 * Created by rts on 28/11/15.
 */
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.75, lng: -74.2},
        zoom: 11
    });
    var imageBounds = {
        north: 40.773941,
        south: 40.712216,
        east: -74.12544,
        west: -74.22655
    };

    historicalOverlay = new google.maps.GroundOverlay(
        'https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
        imageBounds);
    historicalOverlay.setMap(map);
}