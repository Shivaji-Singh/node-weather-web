const request = require('request');

const foreCast = (latitude, longitude, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&appid=1161891e031ea3249a95d004393b4b37'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if ((typeof longitude === 'string') || (typeof latitude === 'string')) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${body.current.weather[0].description} is currently ${body.current.temp} degrees out. There is a ${body.current.uvi} chance of rain.`)
        }
    })

}

module.exports = foreCast