import React, { useState, useMemo, useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AuthContext } from '../context/auth';
import Home from './Home';
import '../Profile.css'
import '../Country.css'
import '../Home.css'
import FormGroup from '@mui/material/FormGroup';
import { makeStyles } from "@material-ui/core";
import { set } from 'mongoose';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Zoom from '@mui/material/Zoom';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import AddIcon from '@mui/icons-material/Add';
import ContinentMap from "../components/ContinentMap";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

ChartJS.register(ArcElement, Tooltip, Legend);


const useStyles = makeStyles((theme) => ({
    formGroup: {
        alignItems: 'center'
    },
    flexGrow: {
        flex: '1',
    },
    button: {
        backgroundColor: '#21ABAB',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#fff',
            color: '#21ABAB',
        },
    }
}));



function Continent(props) {

    const { user } = useContext(AuthContext)
    const options = ['Asia', 'Africa', 'Europe', 'North America', 'South America', 'Australia']
    const [zoom, setZoom] = useState(false)
    const classes = useStyles();
    const [currContinent, setCurrContinent] = useState(null)
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [slidePage, setSlidePage] = useState(false)
    const [error, setError] = useState(false)
    const [continentName, setContinent] = useState('')
    const [allCountries, setAllCountries] = useState(null)
    async function getData(continent) {
        try {
            const response = await fetch(`https://disease.sh/v3/covid-19/continents/${continent}?yesterday=yesterday&strict=true`)
            if (response.ok) {
                setError(false)
                const continent_obj = await response.json()
                setCurrContinent(continent_obj)
                switch (continent_obj.continent) {
                    case 'North America':
                        setContinent('na');
                        break;
                    case 'Asia':
                        setContinent('as');
                        break;
                    case 'South America':
                        setContinent('sa');
                        break;
                    case 'Europe':
                        setContinent('eu');
                        break;
                    case 'Africa':
                        setContinent('af');
                        break;
                    case 'Australia-Oceania':
                        setContinent('oc');
                        break;
                    default:
                        return '';
                }
            } else {
                setError(true)
                console.log("NO Info about the page")
            }
        } catch (error) {

        }
        setSlidePage(true);
    }
    async function getCountries() {
        const response2 = await fetch('https://disease.sh/v3/covid-19/countries')
        const countries_obj = await response2.json()
        setAllCountries(countries_obj)
    }
    useEffect(() => {
        getCountries()
        setZoom(true)
    }, [])

    const page = user ? (
        <Container className='mt-5'>

            <Row className='mt-5' >
                <Col className='mt-5'>
                    <h2 className='content mt-5'>
                        Select continent:
                    </h2>
                    <div className='mt-4'>
                        <FormGroup className={classes.formGroup} noValidate autoComplete="on">
                            <Autocomplete
                                disablePortal
                                value={value}
                                onChange={async (event, newValue) => {
                                    setSlidePage(false)
                                    setValue(newValue)
                                    try {
                                        await getData(newValue.toLowerCase());
                                    } catch (err) {

                                    }
                                }}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                id="combo-box-demo"
                                options={options}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Continent" />}
                            />
                        </FormGroup>
                    </div>
                    <div className='mt-5'>


                    </div>

                </Col>
            </Row>
            {currContinent && error === false ? (

                <Container>
                    <Grow
                        in={slidePage}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(slidePage ? { timeout: 2000 } : {})}   >
                        <Row className='mt-5 mb-5'>
                            <ContinentMap continent={continentName} />
                        </Row>
                    </Grow>
                    <Grow
                        in={slidePage}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(slidePage ? { timeout: 2000 } : {})}   >
                        <Row className='info-card shadow mt-5 mb-5 '>
                            {/* continent card  */}
                            <Col className=' mt-5 mb-5 ' xs={12} md={4}>
                                <div>
                                    <h2 className='country-info mt-4'>
                                        Name
                                        <br />
                                    </h2>
                                    <h4 className='continent-name mt-4'>

                                        {currContinent.continent}
                                    </h4>
                                </div>
                            </Col>
                            <Col className=' mt-5 mb-5 ' xs={12} md={4}>
                                <h2 className='country-info mt-4'>
                                    Population
                                    <br />
                                </h2>
                                <h4 className="population mt-4">
                                    {currContinent.population}
                                </h4>
                            </Col>
                            <Col className=' mt-5 mb-5 ' xs={12} md={4}>
                                <h2 className='country-info mt-4'>
                                    Active Cases
                                    <br />
                                </h2>
                                <h4 className='total-deaths mt-4'>

                                    {currContinent.active}
                                </h4>
                            </Col>
                        </Row>
                    </Grow>
                    <Grow
                        in={slidePage}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(slidePage ? { timeout: 2000 } : {})}   >
                        <Row className='info-card shadow mt-5'>
                            <Col className='mt-5 ' xs={12} md={3}>
                                <h2 className='total-title mt-5'>
                                    Total Stats:
                                </h2>
                            </Col>
                            <Col className=' mt-5 mb-5 ' xs={12} md={3}>
                                <div>
                                    <h2 className='country-info mt-4'>
                                        Cases
                                        <br />
                                    </h2>
                                    <h4 className='total-deaths mt-4'>

                                        {currContinent.cases}
                                    </h4>
                                </div>
                            </Col>
                            <Col className=' mt-5 mb-5 ' xs={12} md={3}>
                                <h2 className='country-info mt-4'>
                                    Recovered
                                    <br />
                                </h2>
                                <h4 className="total-recovered mt-4">
                                    {currContinent.recovered}
                                </h4>
                            </Col>
                            <Col className=' mt-5 mb-5 ' xs={12} md={3}>
                                <h2 className='country-info mt-4'>
                                    Deaths
                                    <br />
                                </h2>
                                <h4 className="total-deaths mt-4">
                                    {currContinent.deaths}
                                </h4>
                            </Col>
                        </Row>
                    </Grow>

                    <Row className='info-card shadow mt-5'>
                        <Col className='mt-5 ' xs={12} md={3}>
                            <h2 className='total-title mt-5'>
                                Today Stats:
                            </h2>
                        </Col>
                        <Col className=' mt-5 mb-5 ' xs={12} md={3}>
                            <div>
                                <h2 className='country-info mt-4'>
                                    Cases
                                    <br />
                                </h2>
                                <h4 className='total-deaths mt-4'>

                                    {currContinent.todayCases}
                                </h4>
                            </div>
                        </Col>
                        <Col className=' mt-5 mb-5 ' xs={12} md={3}>
                            <h2 className='country-info mt-4'>
                                Recovered
                                <br />
                            </h2>
                            <h4 className="total-recovered mt-4">
                                {currContinent.todayRecovered}
                            </h4>
                        </Col>
                        <Col className=' mt-5 mb-5 ' xs={12} md={3}>
                            <h2 className='country-info mt-4'>
                                Deaths
                                <br />
                            </h2>
                            <h4 className="total-deaths mt-4">
                                {currContinent.todayDeaths}
                            </h4>
                        </Col>
                    </Row>

                    <Row>
                        <Col className='mt-5 mb-5' xs={12} md={6}>
                            <h1 className='total-header mb-3 '>
                                Today Stats
                            </h1>
                            <div>
                                <Doughnut data={{
                                    labels: ['Today Cases', 'Today Recovered', 'Today Deaths'],
                                    datasets: [
                                        {
                                            label: 'Today Cases',
                                            data: [currContinent.todayCases, currContinent.todayRecovered, currContinent.todayDeaths],
                                            backgroundColor: [
                                                'rgb(255, 205, 86)',
                                                'rgb(54, 162, 235)',
                                                'rgb(255, 99, 132)'
                                            ],
                                            hoverOffset: 4
                                        },
                                    ],
                                }}
                                    width={500}
                                    height={500
                                    }
                                    options={{ maintainAspectRatio: false }} />

                            </div>
                        </Col>
                        <Col className='mt-5' xs={12} md={6}>
                            <h1 className='total-header mb-3'>
                                Total Stats
                            </h1>
                            <div>
                                <Doughnut data={{
                                    labels: ['Total Cases', 'Total Recovered', 'Total Deaths'],
                                    datasets: [
                                        {
                                            label: 'Total Cases',
                                            data: [currContinent.cases, currContinent.recovered, currContinent.deaths],
                                            backgroundColor: [
                                                'rgb(255, 205, 86)',
                                                'rgb(54, 162, 235)',
                                                'rgb(255, 99, 132)'
                                            ],
                                            hoverOffset: 4
                                        },
                                    ],
                                }}
                                    width={500}
                                    height={500
                                    }
                                    options={{ maintainAspectRatio: false }} />

                            </div>
                        </Col>
                    </Row>
                    <Row className='mt-5 mb-3'>
                        <h1 className='total-header mb-3'>
                            Countries :
                        </h1>
                    </Row>
                    <Row className='mt-5 justify-content-center align-self-center'>
                        <ImageList sx={{ width: 500, height: 450 }} className='info-card shadow'>
                            {
                                allCountries.filter((country) => {
                                    return country.continent === currContinent.continent
                                }).map((country) => {
                                    return (
                                        <ImageListItem key={country.country}>
                                            <img
                                                src={country.countryInfo.flag}
                                                alt={country.country}
                                                loading="lazy"
                                            />
                                            <ImageListItemBar
                                                title={country.country}
                                            />
                                        </ImageListItem>
                                    )
                                })
                            }
                        </ImageList>
                    </Row>

                    <Row className='mt-5 content'>
                        <Zoom in={zoom}>
                            <div className='mb-5'>
                                {/* button to add country to the database */}
                                <Button className={classes.button}
                                    color='success'
                                    variant="contained"
                                    size="large"
                                    endIcon={<AddIcon />}>
                                    Add Continent
                                </Button>
                            </div>
                        </Zoom>
                    </Row>
                </Container>


            ) :
                <div>
                </div>
            }
            <div className='error-message'>
                {error ? (
                    <Container>
                        <h1 className='not-found-title'>400</h1>
                        <div className='not-found-sub-title'>
                            Oooops
                        </div>
                        <div className='not-found-info'>
                            There is no available information about this country
                        </div>
                    </Container>
                ) : ''}
            </div>
        </Container >
    ) :
        <Home />;
    return page
}


export default Continent;
