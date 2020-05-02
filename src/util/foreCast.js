const request = require('request');

const foreCast = (latitude, longitude, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&appid=1161891e031ea3249a95d004393b4b37&units=metric'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if ((typeof longitude === 'string') || (typeof latitude === 'string')) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `Mostly ${body.hourly[0].weather[0].main} throughout the day. It is currently ${body.current.temp} degrees out. The daily highest temperature is ${body.daily[0].temp.max} with a low of ${body.daily[0].temp.min}. There is ${body.current.humidity}% chance to humidity.`)
        }
    })

}

module.exports = foreCast