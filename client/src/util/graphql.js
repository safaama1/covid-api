import gql from 'graphql-tag';

// All the Root Types in the server side

export const CREATE_COUNTRY_MUTATION = gql`
mutation addCountry(
    $name: String!
    $cases: Int!
    $todayCases: Int!
    $todayDeaths: Int!
    $deaths: Int!
    $population: Int!
    $continent: String!
    $active: Int!
    $recovered: Int!
    $todayRecovered: Int!
){
    addCountry(country: {
        name: $name
        cases: $cases
        todayCases: $todayCases
        todayDeaths: $todayDeaths
        deaths: $deaths
        population: $population 
        continent: $continent
        active: $active
        recovered: $recovered
        todayRecovered: $todayRecovered
    }){
        id
        name
        todayCases
        todayDeaths
        deaths
        population
        continent
        active
        recovered
        todayRecovered
    }
}
`
export const CREATE_CONTINENT_MUTATION = gql`
mutation addContinent(
    $name: String!
    $cases: Int!
    $todayCases: Int!
    $todayDeaths: Int!
    $deaths: Int!
    $population: Float!
    $active: Int!
    $recovered: Int!
    $todayRecovered: Int!
){
    addContinent(continent: {
        name: $name
        cases: $cases
        todayCases: $todayCases
        todayDeaths: $todayDeaths
        deaths: $deaths
        population: $population 
        active: $active
        recovered: $recovered
        todayRecovered: $todayRecovered
    }){
        id
        name
        todayCases
        todayDeaths
        deaths
        population
        active
        recovered
        todayRecovered
    }
}
`
export const GET_COUNTRIES_CONTINENTS = gql`
query {
    getCountries {
        id
        name
        cases
        todayCases
        todayDeaths
        deaths
        population
        continent
        active
        recovered
        todayRecovered
    }
    getContinents {
        id
        name
        cases
        todayCases
        todayDeaths
        deaths
        population
        active
        recovered
        todayRecovered
    }
}
`;

export const DELETE_COUNTRY_MUTATION = gql`
mutation($countryId: ID!) {
    deleteCountry(countryID: $countryId)
}
`

export const DELETE_COTINENT_MUTATION = gql`
mutation($continentId: ID!) {
    deleteContinent(continentID: $continentId)
}
`

export const GET_COUNTRIES = gql`
query getCountries{
    getCountries {
        id
        name
        cases
        todayCases
        todayDeaths
        deaths
        population
        continent
        active
        recovered
        todayRecovered
    }
}
`;
export const GET_CONTINENTS = gql`
query getContinents{
    getContinents {
        id
        name
        cases
        todayCases
        todayDeaths
        deaths
        population
        active
        recovered
        todayRecovered
    }
}
`

export const LOGIN_USER = gql`
mutation login(
    $username: String!
    $password: String!
) {
    login(
        username: $username
        password: $password
    ){
        id email username createdAt type token
    }
}
`
export const REGISTER_USER = gql`
mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $type: String!
) {
    register(
        registerInput: {
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
            type: $type
        }
    ){
        id email username createdAt type token
    }
}
`