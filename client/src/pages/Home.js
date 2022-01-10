import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Button, Image, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, Start } from '@fortawesome/free-solid-svg-icons'
import Carousel from 'react-bootstrap/Carousel'
import YoutubeEmbed from "../components/YoutubeEmbed";
import YouTubeIcon from '@mui/icons-material/YouTube';
import Grow from '@mui/material/Grow';
import '../Home.css';



const Home = () => {
    const [cases, setCases] = useState([])
    const [todayDeaths, setTodayDeaths] = useState([])
    const [todayCases, setTodayCases] = useState([])
    const [recovered, setRecovered] = useState([])
    const [loading, setLoading] = useState(true)
    const [slidePage, setSlidePage] = useState(false);

    const delay = ms => new Promise(res => setTimeout(res, ms));
    const getData = async () => {
        setSlidePage(true);
        await delay(1000);
        setLoading(true)
        const response = await fetch('https://corona.lmao.ninja/v2/continents?yesterday=true&sort')
        const arr = await response.json()
        console.log(arr)
        setTodayDeaths(arr.map(continent => continent.todayDeaths).reduce((acc, continent) => continent + acc));
        setTodayCases(arr.map(continent => continent.todayCases).reduce((acc, continent) => continent + acc));
        setRecovered(arr.map(continent => continent.recovered).reduce((acc, continent) => continent + acc));
        setCases(arr.map(continent => continent.active).reduce((acc, continent) => continent + acc));
        setLoading(false)
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <Grow
            in={slidePage}
            style={{ transformOrigin: '0 0 0' }}
            {...(slidePage ? { timeout: 1000 } : {})}
        >
            <Container className='mt-5'>
                <Row className='mt-5 mb-5'>
                    <div className="col-md-6 mt-4 intro-info order-md-first order-last justify-content-center align-self-center ">
                        <p className="text-danger">
                            <FontAwesomeIcon icon={faExclamationTriangle} color='red' />
                            &nbsp;&nbsp;COVID-19 ALERT</p>
                        <h1 className='title-intro'>
                            Together we fight <br /> COVID-19
                        </h1>
                        <div className="header-tag-line mt-5">
                            According to the World Health Organisation [WHO] this pandemic coronavirus can be defined as “The COVID-19 is an infectious disease caused by a newly discovered coronavirus”.
                            <br /> COVID-19 Data Web API provides open access to the collected data on the COVID-19 confirmed cases and deaths in any country or town in the world  .
                        </div>
                        <Button href='/login' variant="outline-success mt-2" size='lg'>Get Started</Button>

                    </div>
                    <div className="col-md-6 mt-4 mb-5 intro-info justify-content-center align-self-center ">
                        <Image className="img-fluid px-lg-1 px-md-0 px-sm-4 px-5" src={process.env.PUBLIC_URL + '/images/undraw_data_processing_yrrv.svg'} />
                    </div>
                </Row>
                <Row className='shadow mt-5 mb-5 '>
                    <Col className='mt-4 justify-content-center align-self-center' xs={6} md={3}>
                        <h2 className='cases-header'>
                            Active Cases <br />
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
                <Row>
                    <Col className='mt-5 text-center' xs={12} md={12}>
                        <h1 className='video-title'>
                        <YouTubeIcon style={{ fontSize: 50 , color:'red' }}  /> The Coronavirus Explained & What You Should Do 
                        </h1>
                    </Col>
                </Row>
                <Row className='mt-5 mb-5 justify-content-center align-self-center'>
                    <Col xs={12} md={12}>
                        <YoutubeEmbed />
                    </Col>

                </Row>

            </Container>
        </Grow>
    )
}
export default Home;