require('dotenv').config();
const Country = require('../../models/Country');
const { UserInputError, AuthenticationError } = require('apollo-server');

module.exports = {
    Query: {
        // get country by id 
        async getCountry(_, { countryID }) {
            try {
                // check if the country is not saved in the database 
                const country = await Country.findById(countryID);
                if (country) {
                    return country
                } else {
                    throw new UserInputError('Country not found', {
                        errors: {
                            name: 'Country not found'
                        }
                    });
                }
            } catch (err) {
                throw new AuthenticationError('Action not allowed');
            }

        }
        , async getCountries() {
            try {
                const countries = await Country.find();
                return countries;
            } catch (err) {
                throw new Error(err);
            }
        }
    }
    , Mutation: {
        async addCountry(
            _,
            {
                country: {
                    name,
                    cases,
                    todayCases,
                    todayDeaths,
                    deaths,
                    population,
                    continent,
                    active,
                    recovered,
                    todayRecovered
                }
            }
        ) {
            /* I didn't add "check if data already exists" because
           the data in the API is always changing (number of cases ,deaths .... ) 
           so its logical that there is more than one country with different data */

            const newCountry = new Country({
                name,
                cases,
                todayCases,
                todayDeaths,
                deaths,
                population,
                continent,
                active,
                recovered,
                todayRecovered,
                createdAt: new Date().toISOString()
            });

            const res = await newCountry.save();
            return res
        },
        // delete country that have this id  
        async deleteCountry(_, { countryID }, context) {
            try {
                // check if the country is saved in the database , if not so throw error 
                const country = await Country.findById(countryID);
                if (country) {
                    await country.delete();
                    return 'Country deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        // update the country with the given id to match the data that is also given
        async updateCountry(_, { countryID,
            country: {
                name,
                cases,
                todayCases,
                todayDeaths,
                deaths,
                population,
                continent,
                active,
                recovered,
                todayRecovered
            } }, context) {
            try {
                const updatedCountry = await Country.findOneAndUpdate({ _id: countryID }, {
                    $set: {
                        name: name,
                        cases: cases,
                        todayCases: todayCases,
                        todayDeaths: todayDeaths,
                        deaths: deaths,
                        population: population,
                        continent: continent,
                        active: active,
                        recovered: recovered,
                        todayRecovered: todayRecovered
                    }
                }, { new: true })
                return updatedCountry

            } catch (err) {
                throw new Error(err);
            }
        }
    }
};