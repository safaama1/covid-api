const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Country = require('../../models/Country');
const { UserInputError, AuthenticationError } = require('apollo-server');

module.exports = {
    Query: {
        async getCountry(_, { countryID }) {
            try {
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
                    active }
            }
        ) {
            const country = await Country.findOne({ name });
            if (country) {
                throw new UserInputError('Country is already added', {
                    errors: {
                        username: 'Country is already added'
                    }
                });
            }
            const newCountry = new Country({
                name,
                cases,
                todayCases,
                todayDeaths,
                deaths,
                population,
                continent,
                active
            });

            const res = await newCountry.save();
            return res
        },
        async deleteCountry(_, { countryID }, context) {
            try {
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
        }
    }
};