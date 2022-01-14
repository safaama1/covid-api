import React, { useState, useMemo, useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../context/auth';
import Button from '@mui/material/Button';
import FlagIcon from '@mui/icons-material/Flag';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import PublicIcon from '@mui/icons-material/Public';
import MapChart from '../components/MapChart';
import ReactTooltip from "react-tooltip";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { purple } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import Grow from '@mui/material/Grow';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { makeStyles } from '@material-ui/core/styles';

import '../Profile.css'

function Profile(props) {
    const useStyles = makeStyles({
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
    })
    const { user } = useContext(AuthContext)
    const [zoom, setZoom] = useState(false)
    const [slidePage, setSlidePage] = useState(false)
    const [content, setContent] = useState("");
    // fetch the country list from the react-select-country-list library
    const classes = useStyles()

    useEffect(() => {
        setSlidePage(true);
        setZoom(true)
    }, [])
    return (
        <Grow
            in={slidePage}
            style={{ transformOrigin: '0 0 0' }}
            {...(slidePage ? { timeout: 1000 } : {})}   >
            <Container className='mt-5'>
                <Row className='mt-5'>
                    <Col className='mt-5'>
                        <h4 className='welcome-message mt-5'>
                            Welcome {user.username}  !
                        </h4>
                        <h1 className='content-header mt-3 '>
                            COVID-19 Data <CoronavirusIcon style={{ fontSize: 70 }} />
                        </h1>
                        <div className='content mt-5'>
                            Select whether you want the latest and total cases<br />from a country or continent
                        </div>
                        <div className='content mt-4'>
                            <Zoom in={zoom}>
                                <Button className={classes.button} color='success' variant="contained" href="/country" endIcon={<FlagIcon />} size="large" >
                                    Country
                                </Button>
                            </Zoom>
                            &nbsp;&nbsp;
                            <Zoom in={zoom}>
                                <Button className={classes.button} color='success' variant="contained" href="/continent" endIcon={<PublicIcon />} size="large">
                                    Continente
                                </Button>
                            </Zoom>


                        </div>
                        <div className=''>
                            <h1 className='map-title mb-1'>
                                Population Map Chart
                            </h1>
                            <MapChart setTooltipContent={setContent} />
                            <ReactTooltip>{content}</ReactTooltip>
                        </div>
                    </Col>

                </Row>
            </Container>
        </Grow>
    );
}


export default Profile;