const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./util/geoCode')
const foreCast = require('./util/foreCast')

const app = express();
const port = process.env.PORT || 3000

//Define paths for express engine
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views');
const partialPaths = path.join(__dirname, '../templates/partials')

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

//General static method for public directory
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialPaths)

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Shivaji Singh"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Us",
        name: "Shivaji Singh"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "Please visit for help.",
        title: "Help",
        name: "Shivaji Singh"
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address;
    if (!address) {
        return res.send({
            err: "You must provide an address"
        })
    }

    geoCode(address, (err, { latitude, longitude, location } = {}) => {
        if (err) {
            return res.send({ err })
        }
        foreCast(latitude, longitude, (err, forecastData) => {
            if (err) {
                return res.send({ err })
            }

            res.send({
                foreCast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            err: "You must provide a search term."
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Shivaji Singh",
        errorMessage: "Help article not found."
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Shivaji Singh",
        errorMessage: "Page not found"
    })
})

app.listen(port, () => {
    console.log("Server connected successfully to port " + port);

})