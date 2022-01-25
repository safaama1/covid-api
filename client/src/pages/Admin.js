import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_COUNTRIES_CONTINENTS } from '../util/graphql'
import { AuthContext } from '../context/auth';
import Home from './Home';
import DeleteButton from '../components/DeleteButton';
import { Container } from 'react-bootstrap';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Slide from 'react-reveal/Slide';

const Admin = (props) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    //get all the countries & continents from the database (two queries calls) 
    const {
        data
    } = useQuery(GET_COUNTRIES_CONTINENTS);

    function deleteCountryCallBack() {
        navigate('/admin')
    }

    const adminPage = user && user.type === "Admin" ? (
        <Container style={{ paddingTop: 40, b: 1, borderRadius: "50px", fontFamily: "Quicksand", marginBottom: "20px" }}>
            <Slide left>
                <h1 className='table-title'>
                    Countries
                </h1>
            </Slide>
            <Slide left>
                {/* saved countries COVID-19 data   */}
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
                                <TableCell style={{ color: "#21ABAB", textAlign: 'center' }}>Date</TableCell>
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
                                        <TableCell style={{ color: "#21ABAB", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "18px" }}>
                                            {country.name}
                                        </TableCell>
                                        <TableCell style={{ color: "#21ABAB", textAlign: "center", fontFamily: "Quicksand", fontSize: "15px" }}>
                                            {country.continent}
                                        </TableCell>
                                        <TableCell style={{ textAlign: "center", fontFamily: "Quicksand", fontSize: "15px" }}>
                                            {country.population}
                                        </TableCell>
                                        <TableCell style={{ color: "red", textAlign: "center", fontFamily: "Quicksand", fontSize: "15px" }}>
                                            {country.cases}
                                        </TableCell>
                                        <TableCell style={{ color: "red", textAlign: "center", fontFamily: "Quicksand", fontSize: "15px" }}>
                                            {country.deaths}
                                        </TableCell>
                                        <TableCell style={{ color: "#32CD32", textAlign: "center", fontFamily: "Quicksand", fontSize: "15px" }}>
                                            {country.recovered}
                                        </TableCell>
                                        <TableCell style={{ color: "red", textAlign: "center", fontFamily: "Quicksand", fontSize: "15px" }}>
                                            {country.active}
                                        </TableCell>
                                        <TableCell style={{ color: "red", textAlign: "center", fontFamily: "Quicksand", fontSize: "15px" }}>
                                            {country.todayCases}
                                        </TableCell>
                                        <TableCell style={{ color: "red", fontFamily: "Quicksand", textAlign: "center", fontSize: "15px" }}>
                                            {country.todayDeaths}
                                        </TableCell>
                                        <TableCell style={{ color: "#32CD32", textAlign: "center", fontFamily: "Quicksand", fontSize: "15px" }}>
                                            {country.todayRecovered}
                                        </TableCell>
                                        <TableCell style={{ color: "#21ABAB", textAlign: "center", fontFamily: "Quicksand", fontSize: "15px" }}>
                                            {country.createdAt.slice(0, 10)}
                                        </TableCell>
                                        <TableCell>
                                            <DeleteButton selectedCountryId={country.id} callBack={deleteCountryCallBack} />
                                        </TableCell>
                                    </TableRow>
                                )) : (<TableRow><TableCell></TableCell></TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Slide>
            <Slide left>
                <h1 className='table-title mt-5'>
                    Continents
                </h1>
            </Slide>

            <Slide left>
                {/* saved continents COVID-19 data   */}
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
                                <TableCell style={{ color: "#21ABAB", textAlign: 'center' }}>Date</TableCell>
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
                                        <TableCell style={{ color: "red", textAlign: "center", fontFamily: "Quicksand", fontSize: "15px" }}>
                                            {continent.cases}
                                        </TableCell>
                                        <TableCell style={{ color: "red", textAlign: "center", fontFamily: "Quicksand", fontSize: "15px" }}>
                                            {continent.deaths}
                                        </TableCell>
                                        <TableCell style={{ color: "#32CD32", textAlign: "center", fontFamily: "Quicksand", fontSize: "15px" }}>
                                            {continent.recovered}
                                        </TableCell>
                                        <TableCell style={{ color: "red", textAlign: "center", fontFamily: "Quicksand", fontSize: "15px" }}>
                                            {continent.active}
                                        </TableCell>
                                        <TableCell style={{ color: "red", textAlign: "center", fontFamily: "Quicksand", fontSize: "15px" }}>
                                            {continent.todayCases}
                                        </TableCell>
                                        <TableCell style={{ color: "red", textAlign: "center", fontFamily: "Quicksand", fontSize: "15px" }}>
                                            {continent.todayDeaths}
                                        </TableCell>
                                        <TableCell style={{ color: "#32CD32", textAlign: "center", fontFamily: "Quicksand", fontSize: "15px" }}>
                                            {continent.todayRecovered}
                                        </TableCell>
                                        <TableCell style={{ color: "#21ABAB", textAlign: "center", fontFamily: "Quicksand", fontSize: "15px" }}>
                                            {continent.createdAt.slice(0, 10)}
                                        </TableCell>
                                        <TableCell>
                                            <DeleteButton selectedContinentId={continent.id} callBack={deleteCountryCallBack} />
                                        </TableCell>
                                    </TableRow>
                                )) : (<TableRow><TableCell></TableCell></TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Slide>
        </Container >
    ) : (
        <Home />
    )
    return adminPage;
}



export default Admin;