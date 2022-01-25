const mongoose = require('mongoose')

const continentSchema = new mongoose.Schema({
    name: String,
    cases: Number,
    todayCases: Number,
    todayDeaths: Number,
    deaths: Number,
    population: Number,
    active: Number,
    recovered: Number,
    todayRecovered: Number,
    createdAt: String
});
module.exports = mongoose.model('Continent', continentSchema)