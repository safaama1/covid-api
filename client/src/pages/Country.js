import React, { useState, useMemo, useContext, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

// bootstrap
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'

/// mui material
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormGroup from '@mui/material/FormGroup';
import { makeStyles } from "@material-ui/core";
import Zoom from '@mui/material/Zoom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Fab from '@mui/material/Fab';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Tooltip2 from '@mui/material/Tooltip';
import Grow from '@mui/material/Grow';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';

import countryList from 'react-select-country-list' // list of all countries in the world
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet' // global map 
// charts
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
//slide animation
import Slide from 'react-reveal/Slide';

import { AuthContext } from '../context/auth';
import Home from './Home';
import { CREATE_COUNTRY_MUTATION } from '../util/graphql';
// css
import '../css/Profile.css'
import '../css/Country.css'
import '../css/Home.css'

ChartJS.register(ArcElement, Tooltip, Legend, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
var data = null // data in the line chart 

/* styles */
const style = {
    margin: 5,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};
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
    const { user } = useContext(AuthContext) // get the current user
    const options = useMemo(() => countryList().getData(), []) // get the list of all countries in the world
    const [zoom, setZoom] = useState(false)
    const classes = useStyles();
    const [currCountry, setCurrCountry] = useState(null)
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [slidePage, setSlidePage] = useState(false)
    const [error, setError] = useState(false)
    const [successful, setSuccessful] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingCountry, setLoadingCountry] = useState(false)
    const [countryShowList, setCountryShowList] = useState(false)
    // current country value
    const [values, setValues] = useState({
        name: '',
        cases: 0,
        todayCases: 0,
        todayDeaths: 0,
        deaths: 0,
        population: 0,
        continent: '',
        active: 0,
        recovered: 0,
        todayRecovered: 0
    })

    /* mutation call to add country to the database */
    const [addCountry, { errors }] = useMutation(CREATE_COUNTRY_MUTATION, {
        variables: values,
        update(_, result) {
            setSuccessful(true)
            setOpen(true);
        },
        onError(err) {
            console.log(errors)
            setCantOpen(true)
        }
    })

    /* API call to get the COVID-19 data about the specific country 
       API wbsite : https://disease.sh/docs/#/   */
    async function getData(country) {
        setLoading(false)
        setCantOpen(false)
        setOpen(false)
        setSuccessful(false)
        setLoadingCountry(false)
        try {
            // get all the COVID-19 data about this country (total and yesterday)
            setLoadingCountry(true)
            const response1 = await fetch(`https://disease.sh/v3/covid-19/countries/${country}?yesterday=true&strict=true`)
            if (response1.ok) {
                setError(false)
                const country_obj = await response1.json()
                setCurrCountry(country_obj)
                setValues({
                    name: country_obj.country,
                    cases: country_obj.cases,
                    todayCases: country_obj.todayCases,
                    todayDeaths: country_obj.todayDeaths,
                    deaths: country_obj.deaths,
                    population: country_obj.population,
                    continent: country_obj.continent,
                    active: country_obj.active,
                    recovered: country_obj.recovered,
                    todayRecovered: country_obj.todayRecovered
                })
            } else {
                setError(true)
            }
            // get cases , deaths and recovered COVID-19 data about this country in the last 30 days  
            const response2 = await fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=30`)
            if (response2.ok) {
                setError(false)
                const country_obj = await response2.json()
                console.log(Object.keys(country_obj.timeline.cases));
                data = {
                    labels: Object.keys(country_obj.timeline.cases),
                    datasets: [
                        {
                            label: "Cases",
                            data: Object.values(country_obj.timeline.cases),
                            fill: true,
                            backgroundColor: "rgba(75,192,192,0.2)",
                            borderColor: "rgba(75,192,192,1)"
                        },
                    ]
                };
            } else {
                setError(true)
            }
            setLoadingCountry(false)
        } catch (error) {
        }
        setLoadingCountry(false)
        setSlidePage(true);
    }

    /* sleep function (used to make the animation a bit slower ) */
    const delay = ms => new Promise(res => setTimeout(res, ms));

    /* ocClick function for the button that adds the country to the database  */
    const onClick = async (event) => {
        event.preventDefault()
        setLoading(true)
        await delay(2000);
        addCountry()
        setLoading(false)
    }

    /* style for the alert that shows if the contry has been added successfully to the database 
       or not  */
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [open, setOpen] = useState(false);
    const [cantOpen, setCantOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setCantOpen(false);
    };

    /* floating action button style (to overide the react mui button style )  */
    const buttonSx = {
        ...(successful ? {
            bgcolor: green[500],
            color: "#fff",
            '&:hover': {
                bgcolor: green[700],
                color: "#fff"
            },
        } : {
            bgcolor: "#21ABAB",
            color: '#fff',
            '&:hover': {
                bgcolor: '#fff',
                color: '#21ABAB'
            }
        }),
    };

    useEffect(() => {
        setZoom(true)
        setCountryShowList(true)
        setLoadingCountry(false)
    }, [])

    // check if the user is logged in and if not go back to homepage 
    const page = user ? (
        <Container className='mt-5'>
            {/* the dropdown menu of countries */}
            <Row className='mt-5' >
                <Col className='mt-5'>
                    <Zoom in={countryShowList}>
                        <h2 className='content mt-5'>
                            Select country:
                        </h2>
                    </Zoom>
                    <Zoom in={countryShowList} style={{ transitionDelay: countryShowList ? '500ms' : '0ms' }}>
                        <div className='mt-4'>
                            <FormGroup className={classes.formGroup} noValidate autoComplete="on">
                                <Autocomplete
                                    disablePortal
                                    value={value}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    onChange={async (event, newValue) => {
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
                    </Zoom>
                    <div className='mt-5'>
                    </div>
                </Col>
            </Row>
            {loadingCountry ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress style={{ color: '#21ABAB' }} />
                </div>
            ) : ''}
            {/* if the country has been found and there is no error, then show the info about this country  */}
            {currCountry && error === false ? (
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
                    <Slide left>
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
                    </Slide>
                    <Slide left>
                        <Row className='info-card shadow mt-5'>
                            <Col className=' mt-5 mb-5 ' xs={12} md={4}>
                                <h2 className='country-info mt-4'>
                                    Tests
                                    <br />
                                </h2>
                                <h4 className="total-recovered mt-4">
                                    {currCountry.tests}
                                </h4>
                            </Col>
                            <Col className=' mt-5 mb-5 ' xs={12} md={4}>
                                <h2 className='country-info mt-4'>
                                    Critical
                                    <br />
                                </h2>
                                <h4 className="total-deaths mt-4">
                                    {currCountry.critical}
                                </h4>
                            </Col>
                            <Col className=' mt-5 mb-5 ' xs={12} md={4}>
                                <h2 className='country-info mt-4'>
                                    Active
                                    <br />
                                </h2>
                                <h4 className="total-deaths mt-4">
                                    {currCountry.active}
                                </h4>
                            </Col>
                        </Row>
                    </Slide>
                    <Slide left>
                        <Row>
                            <Col className='mt-5 mb-5' xs={12} md={6}>
                                <div>
                                    {data ? (<Line data={data} options={{
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: 'Total Cases Chart',
                                                font: {
                                                    size: 33,
                                                    family: 'Quicksand'
                                                }
                                            }
                                        }
                                    }} height={"300rem"}
                                    />) : ''}
                                </div>
                            </Col>
                            <Col className='mt-5' xs={12} md={6}>
                                <div>
                                    <Doughnut data={{
                                        labels: ['Active', 'Total Recovered', 'Total Deaths'],
                                        datasets: [
                                            {
                                                label: 'Total',
                                                data: [currCountry.active, currCountry.recovered, currCountry.deaths],
                                                backgroundColor: [
                                                    'rgb(255, 205, 86)',
                                                    '#21ABAB',
                                                    'rgb(255, 99, 132)'
                                                ],
                                                hoverOffset: 4
                                            },
                                        ],
                                    }}
                                        width={500}
                                        height={500
                                        }
                                        options={{
                                            maintainAspectRatio: false
                                            , plugins: {
                                                title: {
                                                    display: true,
                                                    text: 'Recovery Chart',
                                                    font: {
                                                        size: 33,
                                                        family: 'Quicksand'
                                                    }
                                                }
                                            }
                                        }} />
                                </div>
                            </Col>
                        </Row>
                    </Slide>
                    <Slide left>
                        <Row className='info-card shadow mt-5'>
                            <Col>
                                <h1 className='total-header mt-3 mb-3'>
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
                    </Slide>
                    <Row className='mt-5 content'>
                        <Zoom in={zoom}>
                            <div className='mb-5'>
                                {/* button to add country to the database */}
                                <Box sx={{ m: 1, position: 'relative' }}>
                                    <Tooltip2 title="Save Country">
                                        <Fab style={style} onClick={onClick}
                                            sx={buttonSx}
                                            aria-label="add"
                                            size="large"
                                        >
                                            {successful ? (
                                                <CheckIcon />
                                            ) : (
                                                <SaveIcon />
                                            )}
                                        </Fab>
                                    </Tooltip2>
                                    {loading && (
                                        <CircularProgress
                                            size={68}
                                            sx={{
                                                color: green[500],
                                                position: 'fixed',
                                                bottom: 19,
                                                right: 19,
                                                zIndex: 200,
                                            }}
                                        />

                                    )}
                                </Box>
                                <div className='content mt-3'>
                                    {successful ? (
                                        <Snackbar open={open} autoHideDuration={6000}
                                            onClose={handleClose}
                                            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                                The Country {currCountry.country} has been added successfully !
                                            </Alert>
                                        </Snackbar>) : ''}
                                    {cantOpen ? (
                                        <Snackbar open={cantOpen} autoHideDuration={6000}
                                            onClose={handleClose}
                                            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                                {currCountry.country} cannot be added , try again!
                                            </Alert>
                                        </Snackbar>) : ''}
                                </div>
                            </div>
                        </Zoom>
                    </Row>
                </Container>
            ) :
                <div >
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
