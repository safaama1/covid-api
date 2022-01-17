// const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const countryResolvers = require('./country');
const continentResolvers = require('./continent')

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