const { model, Schema } = require('mongoose')
const countrySchema = new Schema({
    name: String,
    cases: Number,
    todayCases: Number,
    todayDeaths: Number,
    deaths: Number,
    population: Number,
    continent: String,
    active: Number,
    recovered: Number,
    todayRecovered: Number
});
module.exports = model('Country', countrySchema)