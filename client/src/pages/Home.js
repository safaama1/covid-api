import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Button, Image, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, Start } from '@fortawesome/free-solid-svg-icons'
import Carousel from 'react-bootstrap/Carousel'
import '../Home.css';



const Home = () => {
    const [todayDeaths, setTodayDeaths] = useState([])
    const [todayCases, setTodayCases] = useState([])
    const [recovered, setRecovered] = useState([])
    const [loading, setLoading] = useState(true)

    const delay = ms => new Promise(res => setTimeout(res, ms));
    const getData = async () => {
        await delay(1000);
        setLoading(true)
        const response = await fetch('https://corona.lmao.ninja/v2/continents?yesterday=true&sort')
        const arr = await response.json()
        console.log(arr)
        setTodayDeaths(arr.map(continent => continent.todayDeaths).reduce((acc, continent) => continent + acc));
        setTodayCases(arr.map(continent => continent.todayCases).reduce((acc, continent) => continent + acc));
        setRecovered(arr.map(continent => continent.recovered).reduce((acc, continent) => continent + acc));
        console.log(todayCases)
        console.log(todayDeaths)
        console.log(recovered)
        console.log(loading)
        setLoading(false)
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <Container>
            <Row className='mb-4'>
                <div className="col-md-6 mt-4 intro-info order-md-first order-last justify-content-center align-self-center ">
                    <p className="text-danger"><FontAwesomeIcon icon={faExclamationTriangle} color='red' />
                        &nbsp;&nbsp;COVID-19 ALERT</p>
                    <h1 className='title-intro'>
                        Together we fight <br /> COVID-19
                    </h1>
                    <div className="header-tag-line">
                        According to the World Health Organisation [WHO] this pandemic coronavirus can be defined as “The COVID-19 is an infectious disease caused by a newly discovered coronavirus”.
                        <br /> COVID-19 Data Web API provides open access to the collected data on the COVID-19 confirmed cases and deaths in any country or town in the world  .
                    </div>
                    <Button variant="outline-success mt-2" size='lg'>Get Started</Button>

                </div>
                <div className="col-md-6 mt-4 intro-info justify-content-center align-self-center ">
                    <Image className="img-fluid px-lg-1 px-md-0 px-sm-4 px-5" src={process.env.PUBLIC_URL + '/undraw_google_analytics_a-57-d.svg'} />
                </div>
            </Row>
            <Row className='shadow'>
                <Col className='mt-4 justify-content-center align-self-center' xs={6} md={4}>
                    <h2 className='cases-header'>
                        Today Cases <br />
                    </h2>
                    <div className='total-cases mb-3'>
                        {loading ? <Spinner animation="border" variant="secondary" />
                            : todayCases}
                    </div>

                </Col>
                <Col className='mt-4 justify-content-center align-self-center' xs={6} md={4}>
                    <h2 className='cases-header'>
                        Recovered <br />
                    </h2>
                    <div className='total-recovered mb-3'>
                        {loading ? <Spinner animation="border" variant="success" />
                            : recovered}
                    </div>

                </Col>
                <Col className='mt-4 justify-content-center align-self-center' xs={6} md={4}>
                    <h2 className='cases-header'>
                        Today Deaths <br />
                    </h2>
                    <div className='total-deaths mb-3'>
                        {loading ? <Spinner animation="border" variant="danger" />
                            : todayDeaths}
                    </div>

                </Col>
            </Row>

        </Container>
    )
}
export default Home;