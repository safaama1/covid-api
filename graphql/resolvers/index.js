const usersResolvers = require('./users');
const countryResolvers = require('./country');
const continentResolvers = require('./continent')
// get the queries and mutations from every resolver and export them 
module.exports = {
    Query: {
        ...usersResolvers.Query,
        ...countryResolvers.Query,
        ...continentResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...countryResolvers.Mutation,
        ...continentResolvers.Mutation

    },
};