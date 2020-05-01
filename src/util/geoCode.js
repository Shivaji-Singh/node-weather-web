const request = require('request')

const geoCode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZXJpY2staGVuZHJpY2tzb24iLCJhIjoiY2s5Y3l6ZWNrMDBnYjNlcm9vbXRpa2V0YiJ9.u4f8tl2l-HRme5sLP9JnCA&limit=1'

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback("Unable to connect to the weather services", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geoCode