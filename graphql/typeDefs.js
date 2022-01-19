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
    recovered: Int!
    todayRecovered: Int!
  }
  type Continent {
    id: ID!
    name: String!
    cases: Int!
    todayCases: Int!
    todayDeaths: Int!
    deaths: Int!
    population: Float!
    active: Int!
    recovered: Int!
    todayRecovered: Int!
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
    recovered: Int!
    todayRecovered: Int!
  }
  input ContinentInput {
    name: String!
    cases: Int!
    todayCases: Int!
    todayDeaths: Int!
    deaths: Int!
    population: Float!
    active: Int!
    recovered: Int!
    todayRecovered: Int!
  }
  type Query { 
    getUsers: [User]
    getCountry(countryID: ID!): Country!
    getCountries: [Country]
    getContinent(continentID: ID!): Continent!
    getContinents: [Continent]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    addCountry(country: CountryInput!): Country!
    deleteCountry(countryID: ID!): String!
    addContinent(continent: ContinentInput!): Continent!
    deleteContinent(continentID: ID!): String!
  }
`;