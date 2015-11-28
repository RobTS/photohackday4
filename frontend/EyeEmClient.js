/**
 * Created by rts on 28/11/15.
 */
var request = require("request");
var Promise = require("q").Promise;
function EyeEmClient(key) {
    this.access_token = key;
}

EyeEmClient.prototype.fetchPictures = function (lat, lng) {
    var qs = {
        access_token: this.access_token,
        limit: 1,
        lat: lat,
        lng: lng
    };
    return new Promise(function (resolve, reject) {
        request({url: 'https://api.eyeem.com/v2/discover', qs: qs, json: true},
            function (err, res) {
                if (err)
                    reject(err);
                else {
                    resolve(res.body.discover.items[0].photos.items[0])
                }

            })
    });

};


module.exports = EyeEmClient;