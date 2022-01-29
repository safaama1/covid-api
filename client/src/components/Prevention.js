import React from 'react';
import { Row } from 'react-bootstrap';
import MasksIcon from '@mui/icons-material/Masks';
import Slide from 'react-reveal/Slide';
import '../css/Home.css';

// this component includes 5 important covid-19 prevention tips  

function Prevention() {
    return (
        <div>
            <Slide left>
                <Row className='mt-5 justify-content-center'>
                    <h1 className='title mt-5'>
                        <MasksIcon style={{ fontSize: 70, color: '#21ABAB' }} />   Prevention
                    </h1>
                </Row>
            </Slide>


            <div className='prev-container'>
                <Slide left>
                    <div className='prev-card' >
                        <img className="card-image" src={process.env.PUBLIC_URL + '/images/undraw_medical_care_movn.svg'}
                            alt='' />
                        <h2 className='card-title'>
                            Wear A Mask
                        </h2>
                        <p className='card-info'>
                            Masks can help prevent spread of the virus from the person wearing the mask to others.
                        </p>
                    </div>

                    <div className='prev-card' >
                        <img className="card-image" src={process.env.PUBLIC_URL + '/images/undraw_wash_hands_nwl2.svg'}
                            alt='' />
                        <h2 className='card-title'>
                            Wash Your Hands Often
                        </h2>
                        <p className='card-info'>
                            Clean your hands with soop and water, or alcohol-based hand sanitizer.
                        </p>
                    </div>
                </Slide>
                <Slide left>

                    <div className='prev-card' style={{ height: '495px' }}>
                        <img className="card-image" src={process.env.PUBLIC_URL + '/images/undraw_social_distancing_2g0u.svg'} alt='' />
                        <h2 className='card-title'>
                            Physical Distancing
                        </h2>
                        <p className='card-info'>
                            Maintain a safe distance especially from anyone who is coughinf or sneezing.
                        </p>
                    </div>
                    <div className='prev-card' >
                        <img className="card-image" src={process.env.PUBLIC_URL + '/images/vaccine.png'} alt=''
                            style={{ width: '288px', height: '288px' }} />
                        <h2 className='card-title'>
                            Get Vaccinated
                        </h2>
                        <p className='card-info'>
                            Getting vaccinated against COVID-19 can lower your risk of getting and spreading the virus that causes COVID-19.
                        </p>
                    </div>
                </Slide>

                <Slide left>
                    <div className='prev-card' >
                        <img className="card-image" src={process.env.PUBLIC_URL + '/images/undraw_home_cinema_l7yl.svg'} alt=''
                            style={{ width: '288px', height: '288px' }} />
                        <h2 className='card-title'>
                            Stay Home When You Are Sick
                        </h2>
                        <p className='card-info'>
                            Do not leave your home, except to get medical care.
                            Do not visit public areas.
                        </p>

                    </div>
                </Slide>
            </div>
        </div>
    )
}
export default Prevention;