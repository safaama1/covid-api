// const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const countryResolvers = require('./country');
module.exports = {
    Query: {
        ...usersResolvers.Query,
        ...countryResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...countryResolvers.Mutation
    },
};