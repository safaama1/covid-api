const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Continent = require('../../models/Continent');
const { UserInputError, AuthenticationError } = require('apollo-server');

module.exports = {
    Query: {
        async getContinent(_, { continentID }) {
            try {
                const continent = await Continent.findById(continentID);
                if (continent) {
                    return continent
                } else {
                    throw new UserInputError('CounContinenttry not found', {
                        errors: {
                            name: 'Continent not found'
                        }
                    });
                }
            } catch (err) {
                throw new AuthenticationError('Action not allowed');
            }

        }
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
            const continent = await Continent.findOne({ name });
            if (continent) {
                throw new UserInputError('Continent is already added', {
                    errors: {
                        username: 'Continent is already added'
                    }
                });
            }
            const newContinent = new Continent({
                name,
                cases,
                todayCases,
                todayDeaths,
                deaths,
                population,
                active,
                recovered,
                todayRecovered
            });

            const res = await newContinent.save();
            return res
        },
        async deleteContinent(_, { continentID }, context) {
            try {
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