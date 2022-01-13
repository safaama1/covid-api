import React, { useState, useMemo, useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import countryList from 'react-select-country-list'
import { AuthContext } from '../context/auth';
import Home from './Home';
import '../Profile.css'
import '../Country.css'
import '../Home.css'
import FormGroup from '@mui/material/FormGroup';
import { makeStyles } from "@material-ui/core";
import { set } from 'mongoose';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Image from 'react-bootstrap/Image'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Zoom from '@mui/material/Zoom';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import AddIcon from '@mui/icons-material/Add';

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


/* this commponent is used to update the country map every time 
 the user changes the selected country  */
function ChangeMapView({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
}

function Country(props) {

    const { user } = useContext(AuthContext)
    const options = useMemo(() => countryList().getData(), [])
    const [zoom, setZoom] = useState(false)
    const classes = useStyles();
    const [currCountry, setCurrCountry] = useState(null)
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false)
    const [slidePage, setSlidePage] = useState(false)
    const [error, setError] = useState(false)

    async function getData(country) {
        setLoading(true);
        try {
            const response = await fetch(`https://disease.sh/v3/covid-19/countries/${country}?yesterday=yesterday`)
            if (response.ok) {
                setError(false)
                const country_obj = await response.json()
                setCurrCountry(country_obj)
                console.log(country_obj)

            } else {
                setError(true)
                console.log("NO Info about the page")
            }
        } catch (error) {

        }
        setLoading(false);
        setSlidePage(true);
    }


    useEffect(() => {
        // setSlidePage(true)
        setZoom(true)
    }, [])

    const page = user ? (
        <Container className='mt-5'>

            <Row className='mt-5' >
                <Col className='mt-5'>
                    <h2 className='content mt-5'>
                        Select country:
                    </h2>
                    <div className='mt-4'>
                        <FormGroup className={classes.formGroup} noValidate autoComplete="on">
                            <Autocomplete
                                disablePortal
                                value={value}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                onChange={async (event, newValue) => {
                                    console.log(newValue)
                                    setSlidePage(false)
                                    setValue(newValue.label)
                                    try {
                                        await getData(newValue.label.toLowerCase());
                                    } catch (err) {

                                    }
                                }}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                id="combo-box-demo"
                                options={options}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Country" />}
                            />
                        </FormGroup>
                    </div>
                    <div className='mt-5'>


                    </div>

                </Col>
            </Row>
            {currCountry && error == false ? (

                <Container>
                    <Grow
                        in={slidePage}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(slidePage ? { timeout: 2000 } : {})}   >
                        <Row className='info-card shadow mt-5 mb-5 '>
                            {/* country card  */}
                            <Col className='mt-5 mb-5' xs={12} md={3}>
                                <Image className='shadow ms-4'
                                    src={currCountry.countryInfo.flag}
                                    fluid roundedCircle />
                            </Col>
                            <Col className=' mt-5 mb-5 ' xs={12} md={3}>
                                <div>
                                    <h2 className='country-info mt-4'>
                                        Name
                                        <br />
                                    </h2>
                                    <h4 className='continent-name mt-4'>

                                        {currCountry.country}
                                    </h4>
                                </div>
                            </Col>
                            <Col className=' mt-5 mb-5 ' xs={12} md={3}>
                                <h2 className='country-info mt-4'>
                                    Population
                                    <br />
                                </h2>
                                <h4 className="population mt-4">
                                    {currCountry.population}
                                </h4>
                            </Col>
                            <Col className=' mt-5 mb-5 ' xs={12} md={3}>
                                <h2 className='country-info mt-4'>
                                    Continent
                                    <br />
                                </h2>
                                <h4 className="population mt-4">
                                    {currCountry.continent}
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

                                        {currCountry.cases}
                                    </h4>
                                </div>
                            </Col>
                            <Col className=' mt-5 mb-5 ' xs={12} md={3}>
                                <h2 className='country-info mt-4'>
                                    Recovered
                                    <br />
                                </h2>
                                <h4 className="total-recovered mt-4">
                                    {currCountry.recovered}
                                </h4>
                            </Col>
                            <Col className=' mt-5 mb-5 ' xs={12} md={3}>
                                <h2 className='country-info mt-4'>
                                    Deaths
                                    <br />
                                </h2>
                                <h4 className="total-deaths mt-4">
                                    {currCountry.deaths}
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

                                    {currCountry.todayCases}
                                </h4>
                            </div>
                        </Col>
                        <Col className=' mt-5 mb-5 ' xs={12} md={3}>
                            <h2 className='country-info mt-4'>
                                Recovered
                                <br />
                            </h2>
                            <h4 className="total-recovered mt-4">
                                {currCountry.todayRecovered}
                            </h4>
                        </Col>
                        <Col className=' mt-5 mb-5 ' xs={12} md={3}>
                            <h2 className='country-info mt-4'>
                                Deaths
                                <br />
                            </h2>
                            <h4 className="total-deaths mt-4">
                                {currCountry.todayDeaths}
                            </h4>
                        </Col>
                    </Row>

                    <Row>
                        <Col className='mt-5 mb-5' xs={12} md={6}>
                            {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
                            <div>{`inputValue: '${inputValue}'`}</div> */}
                            <h1 className='total-header mb-3 '>
                                Today Stats
                            </h1>
                            <div>
                                <Doughnut data={{
                                    labels: ['Today Cases', 'Today Recovered', 'Today Deaths'],
                                    datasets: [
                                        {
                                            label: 'Today Cases',
                                            data: [currCountry.todayCases, currCountry.todayRecovered, currCountry.todayDeaths],
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
                                            data: [currCountry.cases, currCountry.recovered, currCountry.deaths],
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
                    <Row className='info-card shadow mt-5'>
                        <Col>
                            <h1 className='total-header mt-5 mb-5'>
                                {currCountry.country}'s Location <LocationOnIcon style={{ marginTop: -12, fontSize: 45, color: "#21ABAB" }} />
                            </h1>
                            <MapContainer
                                center={[currCountry.countryInfo.lat, currCountry.countryInfo.long]}
                                zoom={6}
                                style={{ height: '80vh', width: '80wh' }}
                                scrollWheelZoom={false}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[currCountry.countryInfo.lat, currCountry.countryInfo.long]}>
                                    <Popup>
                                        {currCountry.country}
                                    </Popup>
                                </Marker>
                                <ChangeMapView coords={[currCountry.countryInfo.lat, currCountry.countryInfo.long]} />
                            </MapContainer>
                        </Col>
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
                                    Add Country
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


export default Country;
