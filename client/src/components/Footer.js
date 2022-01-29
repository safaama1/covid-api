import React from 'react';
import CopyrightIcon from '@mui/icons-material/Copyright';
import '../css/Home.css'
const Footer = () => {

    return (
        <div className='footer'>
            COVID-19 Data <img src={process.env.PUBLIC_URL + '/images/covid_icon.ico'} alt='' className='footer-logo' />
            <br />
            Images from <a href='https://undraw.co/illustrations' >unDraw</a>.
            All rights reversed, CopyLeft <CopyrightIcon flip={''} /> 2022
        </div>
    )
}
export default Footer;