import React, { useEffect, useState, useContext } from 'react'
import { Row, Col, Container, Button, Image, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import YoutubeEmbed from "../components/YoutubeEmbed";
import YouTubeIcon from '@mui/icons-material/YouTube';
import { AuthContext } from '../context/auth';
import { makeStyles } from '@material-ui/core/styles';
import StartIcon from '@mui/icons-material/Start';
import Slide from 'react-reveal/Slide';

import Profile from './Profile';
import Prevention from '../components/Prevention';
import Footer from '../components/Footer';
import '../css/Home.css';



const Home = () => {
    const { user } = useContext(AuthContext)
    const [cases, setCases] = useState([])
    const [todayDeaths, setTodayDeaths] = useState([])
    const [todayCases, setTodayCases] = useState([])
    const [recovered, setRecovered] = useState([])
    const [loading, setLoading] = useState(true)

    const useStyles = makeStyles({
        flexGrow: {
            flex: '1',
        },
        button: {
            borderRadius: 20,
            backgroundColor: '#21ABAB',
            color: '#fff',
            '&:hover': {
                backgroundColor: '#fff',
                color: '#21ABAB',
            },
        }
    })

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const getData = async () => {
        await delay(1000);
        setLoading(true)
        // get the worlds' COVID-19 info (total cases ,deaths ,recovered in the world)  
        const response = await fetch('https://disease.sh/v3/covid-19/all?yesterday=true')
        const arr = await response.json()
        setTodayDeaths(arr.todayDeaths);
        setTodayCases(arr.todayCases);
        setRecovered(arr.recovered);
        setCases(arr.cases);
        setLoading(false)
    }

    const classes = useStyles()

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const homePage = user ? <Profile /> : (
        <Container className='mt-5 pt-3' >
            <Slide left>
                <Row className='mt-5 mb-5'>
                    <div className="col-md-6 mt-4 intro-info order-md-first order-last justify-content-center align-self-center ">
                        <p className="text-danger">
                            <FontAwesomeIcon icon={faExclamationTriangle} color='red' />
                            &nbsp;&nbsp;COVID-19 ALERT</p>
                        <h1 className='title-intro'>
                            Together we fight <br /> COVID-19
                        </h1>
                        <div className="header-tag-line mt-3 mb-3">
                            According to the World Health Organisation [WHO] this pandemic coronavirus can be defined as ???The COVID-19 is an infectious disease caused by a newly discovered coronavirus???.
                            <br /> COVID-19 Data Web API provides open access to the collected data on the COVID-19 confirmed cases and deaths in any Continent or Country in the world  .
                        </div>
                        <Button className={classes.button}
                            href='/register'
                            color='success'
                            variant="contained"
                            size="large">
                            Get Started <StartIcon />
                        </Button>

                    </div>
                    <div className="col-md-6 mt-4 mb-5 intro-info justify-content-center align-self-center ">
                        <Image className="img-fluid px-lg-1 px-md-0 px-sm-4 px-5" src={process.env.PUBLIC_URL + '/images/undraw_data_processing_yrrv.svg'} />
                    </div>
                </Row>
            </Slide>

            <Slide left>
                {/* COVID-19 info */}
                <Row className='shadow mt-5 mb-5' style={{ borderRadius: "20px" }}>
                    <Col className='mt-4 justify-content-center align-self-center' xs={6} md={3}>
                        <h2 className='cases-header'>
                            Total Cases <br />
                        </h2>
                        <div className='total-deaths mb-3'>
                            {loading ? <Spinner animation="border" variant="danger" />
                                : cases}
                        </div>

                    </Col>
                    <Col className='mt-4 justify-content-center align-self-center' xs={6} md={3}>
                        <h2 className='cases-header'>
                            Today Cases <br />
                        </h2>
                        <div className='total-cases mb-3'>
                            {loading ? <Spinner animation="border" variant="secondary" />
                                : todayCases}
                        </div>

                    </Col>
                    <Col className='mt-4 justify-content-center align-self-center' xs={6} md={3}>
                        <h2 className='cases-header'>
                            Recovered <br />
                        </h2>
                        <div className='total-recovered mb-3'>
                            {loading ? <Spinner animation="border" variant="success" />
                                : recovered}
                        </div>

                    </Col>
                    <Col className='mt-4 justify-content-center align-self-center' xs={6} md={3}>
                        <h2 className='cases-header'>
                            Today Deaths <br />
                        </h2>
                        <div className='total-deaths mb-3'>
                            {loading ? <Spinner animation="border" variant="danger" />
                                : todayDeaths}
                        </div>

                    </Col>

                </Row>
            </Slide>
            {/* helpfull youtube videos */}
            <Slide left>
                <Row>
                    <Col className='mt-5 text-center' xs={12} md={12}>
                        <h1 className='video-title'>
                            <YouTubeIcon style={{ fontSize: 50, color: 'red' }} /> The Coronavirus Explained & What You Should Do
                        </h1>
                    </Col>
                </Row>
            </Slide>

            <Slide left>

                <Row className='mt-5 mb-5 justify-content-center align-self-center'>
                    <Col xs={12} md={12}>
                        <YoutubeEmbed embedId="BtN-goy9VOY" />
                    </Col>

                </Row>
            </Slide>

            <Slide left>

                <Row>
                    <Col className='mt-5 text-center' xs={12} md={12}>
                        <h1 className='video-title'>
                            <YouTubeIcon style={{ fontSize: 50, color: 'red' }} /> What is an API?
                        </h1>
                    </Col>
                </Row>
            </Slide>

            <Slide left>

                <Row className='mt-5 mb-5 justify-content-center align-self-center'>
                    <Col xs={12} md={12}>
                        <YoutubeEmbed embedId="s7wmiS2mSXY" />
                    </Col>

                </Row>
            </Slide>

            {/* Prevention instructions */}
            <Prevention />

            {/* Footer */}
            <Footer />
        </Container >
    )
    return homePage;
}
export default Home;