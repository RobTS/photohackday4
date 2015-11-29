/**
 * Created by rts on 28/11/15.
 */
var request = require("request");
var Promise = require("q").Promise;
function EyeEmClient(key) {
    this.access_token = key;
}

EyeEmClient.prototype.fetchPictures2 = function (lat, lng) {
    var qs = {
        access_token: this.access_token,
        limit: 30,
        latitude: lat,
        longitude: lng,
        q : $("#querystring").val()
    };
    return new Promise(function (resolve, reject) {
        request({url: 'https://api.eyeem.com/v2/search/photos', qs: qs, json: true},
            function (err, res) {
                if (err)
                    reject(err);
                else {
                    if (res.body.photos && res.body.photos.items)
                    {
                        var nr = Math.floor(res.body.photos.items.length * Math.random())
                        resolve(res.body.photos.items[nr])
                    } else resolve(null);
                }

            })
    });

};
EyeEmClient.prototype.fetchPictures = function (lat, lng) {
    var qs = {
        access_token: this.access_token,
        limit: 30,
        lat: lat,
        lng: lng
    };
    return new Promise(function (resolve, reject) {
        request({url: 'https://api.eyeem.com/v2/discover', qs: qs, json: true},
            function (err, res) {
                if (err)
                    reject(err);
                else {
                    var nr = Math.floor(Math.random()*res.body.discover.items[0].photos.items.length);
                    resolve(res.body.discover.items[0].photos.items[0])
                }

            })
    });

};

module.exports = EyeEmClient;