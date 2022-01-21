import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth';
import Home from './Home';
import DeleteButton from '../components/DeleteButton';

import { Container } from 'react-bootstrap';

import Grow from '@mui/material/Grow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Admin = (props) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const [slidePage, setSlidePage] = useState(false);
    //get all the countries & continents from the database (two queries calls) 
    const {
        data
    } = useQuery(GET_COUNTRIES_CONTINENTS);

    function deleteCountryCallBack() {
        navigate('/admin')
    }

    useEffect(() => {
        setSlidePage(true)
    }, [])
    const adminPage = user && user.type === "Admin" ? (
        <Grow
            in={slidePage}
            style={{ transformOrigin: '0 0 0' }}
            {...(slidePage ? { timeout: 2000 } : {})}   >
            <Container style={{ paddingTop: 40, b: 1, borderRadius: "50px", fontFamily: "Quicksand", marginBottom: "20px" }}>
                <h1 className='table-title'>
                    Countries
                </h1>
                <TableContainer component={Paper} style={{ marginTop: "50px", b: 1, borderRadius: "20px" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                        <caption>COVID-19 data for all countries saved in the database  </caption>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: "#21ABAB" }}>Name</TableCell>
                                <TableCell style={{ color: "#21ABAB" }}>Continent</TableCell>
                                <TableCell style={{ color: "#21ABAB" }}>Population</TableCell>
                                <TableCell style={{ color: "#21ABAB" }}>Cases</TableCell>
                                <TableCell style={{ color: "#21ABAB" }}>Deaths</TableCell>
                                <TableCell style={{ color: "#21ABAB" }}>Recovered</TableCell>
                                <TableCell style={{ color: "#21ABAB" }}>Active</TableCell>
                                <TableCell style={{ color: "#21ABAB" }}>Today Cases</TableCell>
                                <TableCell style={{ color: "#21ABAB" }}>Today Deaths</TableCell>
                                <TableCell style={{ color: "#21ABAB" }}>Today Recovered</TableCell>
                                <TableCell ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data ?
                                data.getCountries.map((country) => (
                                    <TableRow
                                        key={country.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={{ color: "#21ABAB", fontWeight: "bold", fontSize: "18px" }}>{country.name}</TableCell>
                                        <TableCell style={{ color: "#21ABAB", textAlign: "center" }}>{country.continent}</TableCell>
                                        <TableCell style={{ textAlign: "center" }}>{country.population}</TableCell>
                                        <TableCell style={{ color: "red", textAlign: "center" }}>{country.cases}</TableCell>
                                        <TableCell style={{ color: "red", textAlign: "center" }}>{country.deaths}</TableCell>
                                        <TableCell style={{ color: "#32CD32", textAlign: "center" }}>{country.recovered}</TableCell>
                                        <TableCell style={{ color: "red", textAlign: "center" }}>{country.active}</TableCell>
                                        <TableCell style={{ color: "red", textAlign: "center" }}>{country.todayCases}</TableCell>
                                        <TableCell style={{ color: "red", textAlign: "center" }}>{country.todayDeaths}</TableCell>
                                        <TableCell style={{ color: "#32CD32", textAlign: "center" }}>{country.todayRecovered}</TableCell>
                                        <TableCell>
                                            <DeleteButton selectedCountryId={country.id} callBack={deleteCountryCallBack} />
                                        </TableCell>
                                    </TableRow>
                                )) : (<TableRow><TableCell></TableCell></TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
                <h1 className='table-title mt-5'>
                    Continents
                </h1>
                <TableContainer component={Paper} style={{ marginTop: "50px", b: 1, borderRadius: "20px" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                        <caption>COVID-19 data for all continents saved in the database </caption>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: "#21ABAB" }}>Name</TableCell>
                                <TableCell style={{ color: "#21ABAB" }}>Population</TableCell>
                                <TableCell style={{ color: "#21ABAB" }}>Cases</TableCell>
                                <TableCell style={{ color: "#21ABAB" }}>Deaths</TableCell>
                                <TableCell style={{ color: "#21ABAB" }}>Recovered</TableCell>
                                <TableCell style={{ color: "#21ABAB" }}>Active</TableCell>
                                <TableCell style={{ color: "#21ABAB" }}>Today Cases</TableCell>
                                <TableCell style={{ color: "#21ABAB" }}>Today Deaths</TableCell>
                                <TableCell style={{ color: "#21ABAB" }}>Today Recovered</TableCell>
                                <TableCell ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data ?
                                data.getContinents.map((continent) => (
                                    <TableRow
                                        key={continent.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={{ color: "#21ABAB", fontWeight: "bold", fontSize: "18px" }}>{continent.name}</TableCell>
                                        <TableCell style={{ textAlign: "center" }}>{continent.population}</TableCell>
                                        <TableCell style={{ color: "red", textAlign: "center" }}>{continent.cases}</TableCell>
                                        <TableCell style={{ color: "red", textAlign: "center" }}>{continent.deaths}</TableCell>
                                        <TableCell style={{ color: "#32CD32", textAlign: "center" }}>{continent.recovered}</TableCell>
                                        <TableCell style={{ color: "red", textAlign: "center" }}>{continent.active}</TableCell>
                                        <TableCell style={{ color: "red", textAlign: "center" }}>{continent.todayCases}</TableCell>
                                        <TableCell style={{ color: "red", textAlign: "center" }}>{continent.todayDeaths}</TableCell>
                                        <TableCell style={{ color: "#32CD32", textAlign: "center" }}>{continent.todayRecovered}</TableCell>
                                        <TableCell>
                                            <DeleteButton selectedContinentId={continent.id} callBack={deleteCountryCallBack} />

                                        </TableCell>
                                    </TableRow>
                                )) : (<TableRow><TableCell></TableCell></TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container >
        </Grow>
    ) : (
        <Home />
    )
    return adminPage;
}

const GET_COUNTRIES_CONTINENTS = gql`
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



export default Admin;