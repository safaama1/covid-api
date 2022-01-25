const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Continent = require('../../models/Continent');
const { UserInputError, AuthenticationError } = require('apollo-server');

module.exports = {
    Query: {
        // get continent by id
        async getContinent(_, { continentID }) {
            try {
                // check if the continent is not saved in the database 
                const continent = await Continent.findById(continentID);
                if (continent) {
                    return continent
                } else {
                    throw new UserInputError('Continent not found', {
                        errors: {
                            name: 'Continent not found'
                        }
                    });
                }
            } catch (err) {
                throw new AuthenticationError('Action not allowed');
            }

        }
        // get all continents 
        , async getContinents() {
            try {
                const continents = await Continent.find();
                return continents;
            } catch (err) {
                throw new Error(err);
            }
        }
    }
    , Mutation: {
        async addContinent(
            _,
            {
                continent: {
                    name,
                    cases,
                    todayCases,
                    todayDeaths,
                    deaths,
                    population,
                    active,
                    recovered,
                    todayRecovered
                 }
            }
        ) {
            /* I didn't add "check if data already exists" because
            the data in the API is always changing (number of cases ,deaths .... )
            so its logical that there is more than one continent with different data  */

            const newContinent = new Continent({
                name,
                cases,
                todayCases,
                todayDeaths,
                deaths,
                population,
                active,
                recovered,
                todayRecovered,
                createdAt: new Date().toISOString()
            });

            const res = await newContinent.save();
            return res
        },
        async deleteContinent(_, { continentID }, context) {
            try {
                // check if the continent is saved in the database , if not so throw error 
                const continent = await Continent.findById(continentID);
                if (continent) {
                    await continent.delete();
                    return 'Continent deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
};