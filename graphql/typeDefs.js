const { gql } = require('apollo-server');

module.exports = gql`
  type Country {
    id: ID!
    name: String!
    cases: Int!
    todayCases: Int!
    todayDeaths: Int!
    deaths: Int!
    population: Int!
    continent: String!
    active: Int!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input CountryInput {
    name: String!
    cases: Int!
    todayCases: Int!
    todayDeaths: Int!
    deaths: Int!
    population: Int!
    continent: String!
    active: Int!
  }
  type Query { 
    getUsers: [User]
    getCountry(countryID: ID!): Country!
    getCountries: [Country]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    addCountry(country: CountryInput!): Country!
    deleteCountry(countryID: ID!): String!
  }
`;