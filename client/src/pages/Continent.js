import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AuthContext } from '../context/auth';
import Home from './Home';
import FormGroup from '@mui/material/FormGroup';
import { makeStyles } from "@material-ui/core";
import { useMutation } from '@apollo/react-hooks';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Zoom from '@mui/material/Zoom';
import Grow from '@mui/material/Grow';
import ContinentMap from "../components/ContinentMap";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import Fab from '@mui/material/Fab';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Tooltip2 from '@mui/material/Tooltip';
import { CREATE_CONTINENT_MUTATION } from '../util/graphql';

//slide animation
import Slide from 'react-reveal/Slide';
// css
import '../css/Profile.css'
import '../css/Country.css'
import '../css/Home.css'

ChartJS.register(ArcElement, Tooltip, Legend);

// style for the floating action button
const style = {
    margin: 5,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

// style for the buttons in the page (overrides the button style from React mui)
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

    const { user } = useContext(AuthContext) // get the current user 
    const [zoom, setZoom] = useState(false)
    const classes = useStyles();
    const [currContinent, setCurrContinent] = useState(null)
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [slidePage, setSlidePage] = useState(false)
    const [error, setError] = useState(false)
    const [continentName, setContinent] = useState('')
    const [allCountries, setAllCountries] = useState(null)
    const [successful, setSuccessful] = useState(false)
    const [loading, setLoading] = useState(false)
    const [countryShowList, setCountryShowList] = useState(false)
    const [loadingContinent, setLoadingContinent] = useState(false)

    // the continents names 
    const options = ['Asia', 'Africa', 'Europe', 'North America', 'South America', 'Australia']

    /* API call to get the COVID-19 data about the specific continent 
       API wbsite : https://disease.sh/docs/#/   */
    async function getData(continent) {
        setLoading(false)
        setCantOpen(false)
        setOpen(false)
        setSuccessful(false)
        setLoadingContinent(false)
        try {
            setLoadingContinent(true)
            const response = await fetch(`https://disease.sh/v3/covid-19/continents/${continent}?yesterday=true&strict=true`)
            if (response.ok) {
                setError(false)
                const continent_obj = await response.json()
                setCurrContinent(continent_obj)
                // save the data 
                setValues({
                    name: continent_obj.continent,
                    cases: continent_obj.cases,
                    todayCases: continent_obj.todayCases,
                    todayDeaths: continent_obj.todayDeaths,
                    deaths: continent_obj.deaths,
                    population: continent_obj.population,
                    active: continent_obj.active,
                    recovered: continent_obj.recovered,
                    todayRecovered: continent_obj.todayRecovered
                })
                // check the continent name and add show its location on map 
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
                setLoadingContinent(false)
            } else {
                setError(true)
            }
        } catch (error) {

        }
        setLoadingContinent(false)
        setSlidePage(true);
    }
    // the props of the continent
    const [values, setValues] = useState({
        name: '',
        cases: 0,
        todayCases: 0,
        todayDeaths: 0,
        deaths: 0,
        population: 0,
        active: 0,
        recovered: 0,
        todayRecovered: 0
    })
    const [open, setOpen] = useState(false);
    const [cantOpen, setCantOpen] = useState(false);

    // get the addContinent mutation 
    const [addContinent] = useMutation(CREATE_CONTINENT_MUTATION, {
        variables: values,
        update(_, result) {
            setSuccessful(true)
            setOpen(true);
        },
        onError(err) {
            setCantOpen(true)
        }
    })
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


    // style of the alert that shows success or fail of adding continent to database     
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    // API call to get the continents' countries 
    // and show their flags 
    async function getCountries() {
        const response2 = await fetch('https://disease.sh/v3/covid-19/countries')
        const countries_obj = await response2.json()
        setAllCountries(countries_obj)
    }

    // sleep function to make the animations a bit slower 
    const delay = ms => new Promise(res => setTimeout(res, ms));

    // listener for the "save to data base" button 
    const onClick = async (event) => {
        setLoading(true)
        await delay(2000);
        event.preventDefault()
        addContinent()
        setLoading(false)
    }
    useEffect(() => {
        // get all the countries at start to minimize the number of calls every time we change continent
        getCountries()
        setCountryShowList(true)
        setZoom(true)
    }, [])

    const page = user ? (
        <Container className='mt-5'>
            {/* the dropdown menu of continents */}
            <Row className='mt-5' >
                <Col className='mt-5'>
                    <Zoom in={countryShowList}>
                        <h2 className='content mt-5'>
                            Select continent:
                        </h2>
                    </Zoom>
                    <Zoom in={countryShowList} style={{ transitionDelay: countryShowList ? '500ms' : '0ms' }}>
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
                    </Zoom>

                    <div className='mt-5'>
                    </div>

                </Col>
            </Row>
            {loadingContinent ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress style={{ color: '#21ABAB' }} />
                </div>
            ) : ''}
            {/* if the chosen continent has valid data then show it 
            and there is no error   */}
            {currContinent && error === false ? (
                <Container>
                    <Grow
                        in={slidePage}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(slidePage ? { timeout: 2000 } : {})}   >
                        <Row className='mt-5 mb-5 justify-content-center'>
                            <ContinentMap continent={continentName} />
                        </Row>
                    </Grow>
                    <Grow
                        in={slidePage}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(slidePage ? { timeout: 2000 } : {})}   >
                        <Row className='info-card shadow mt-5 mb-5 '>
                            {/* continent info  */}
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
                        {/* continent COVID-19 info  */}
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
                    </Slide>
                    <Slide left>
                        <Row className='info-card shadow mt-5'>
                            <Col className=' mt-5 mb-5 ' xs={12} md={6}>
                                <h2 className='country-info mt-4'>
                                    Tests
                                    <br />
                                </h2>
                                <h4 className="total-recovered mt-4">
                                    {currContinent.tests}
                                </h4>
                            </Col>
                            <Col className=' mt-5 mb-5 ' xs={12} md={6}>
                                <h2 className='country-info mt-4'>
                                    Critical
                                    <br />
                                </h2>
                                <h4 className="total-deaths mt-4">
                                    {currContinent.critical}
                                </h4>
                            </Col>
                        </Row>
                    </Slide>
                    <Slide left>

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
                                        labels: ['Active', 'Total Recovered', 'Total Deaths'],
                                        datasets: [
                                            {
                                                label: 'Total',
                                                data: [currContinent.active, currContinent.recovered, currContinent.deaths],
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
                    </Slide>
                    <Slide left>
                        <Row className='mt-5 mb-3'>
                            <h1 className='total-header mb-3'>
                                Countries :
                            </h1>
                        </Row>
                    </Slide>
                    <Slide left>
                        {/* image list of all the countries and their flag in this continent */}
                        <Row className='mt-5 justify-content-center align-self-center'>
                            <ImageList sx={{ width: 700, height: 450 }} cols={3} className='info-card shadow'>
                                {
                                    allCountries.filter((country) => {
                                        // if the countries' continent equals the current continent then show its flag
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
                    </Slide>
                    <Row className='mt-5 content'>
                        <Zoom in={zoom}>
                            <div className='mb-5'>
                                {/* flaot action button to add continent to the database */}
                                <Box sx={{ m: 1, position: 'relative' }}>
                                    <Tooltip2 title="Save Continent">
                                        <Fab style={style} onClick={onClick} sx={buttonSx} color="primary" aria-label="add">
                                            {successful ? <CheckIcon /> : <SaveIcon />}
                                        </Fab>
                                    </Tooltip2>
                                    {/* show loading animation */}
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
                                {/* alerts for the result of adding to the database */}
                                <div className='content mt-3'>
                                    {successful ? (<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                                        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                            The Continent {currContinent.continent} has been added successfully!
                                        </Alert>
                                    </Snackbar>) : ''}
                                    {cantOpen ? (<Snackbar open={cantOpen} autoHideDuration={6000} onClose={handleClose}
                                        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                            {currContinent.continent} can't be added, try again !
                                        </Alert>
                                    </Snackbar>) : ''}
                                </div>
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
                            There is no available information about this continent
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
