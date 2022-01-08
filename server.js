const { ApolloServer, PubSub } = require('apollo-server');
require('dotenv').config();
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const PORT = process.env.port || 5000;


const server = new ApolloServer({
    typeDefs,
    resolvers,
});


mongoose.connect(process.env.DB_URI, {
    dbName: 'COVID-API',
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
}).then(() => {
    console.log('MongoDB Connected');
    return server.listen(PORT);
}).then((res) => {
    console.log(`Server running at ${res.url}`);
}).catch(err => {
    console.error(err)
})