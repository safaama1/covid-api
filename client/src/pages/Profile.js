import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../context/auth';
import Button from '@mui/material/Button';
import FlagIcon from '@mui/icons-material/Flag';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import PublicIcon from '@mui/icons-material/Public';
import MapChart from '../components/MapChart';
import ReactTooltip from "react-tooltip";
import Zoom from '@mui/material/Zoom';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';

import { makeStyles } from '@material-ui/core/styles';

import '../css/Profile.css'

import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

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

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };
    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;
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
                            Welcome
                            <Button className={classes.button} variant="contained" onClick={handleClick} size="small"
                                style={{ borderRadius: 20, fontSize: '16px', fontFamily: 'Quicksand', margin: 5, marginBottom: "10px", fontWeight: 'bold' }}>
                                {user.username}
                            </Button>
                            &nbsp;!
                        </h4>
                        <Popper id={id} open={open} anchorEl={anchorEl} transition>
                            {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={350}>
                                    <Box className='user-info'>
                                        <div>
                                            <PersonIcon style={{ fontSize: 20 }} /> Username:
                                            <p style={{ color: "black", fontWeight: 700, marginBottom: 0 }}>
                                                {user.username}
                                            </p>
                                        </div>
                                        <div>
                                            <AlternateEmailIcon style={{ fontSize: 20 }} /> Email:
                                            <p style={{ color: "black", fontWeight: 700, marginBottom: 0 }}>
                                                {user.email}
                                            </p>
                                        </div>
                                        <div>
                                            <AdminPanelSettingsIcon style={{ fontSize: 20 }} /> Type:
                                            <p style={{ color: "black", fontWeight: 700, marginBottom: 0 }}>
                                                {user.type ? user.type : ''}
                                            </p>
                                        </div>
                                    </Box>
                                </Fade>
                            )}
                        </Popper>
                        <h1 className='content-header mt-3 '>
                            COVID-19 Data <CoronavirusIcon style={{ fontSize: 70 }} />
                        </h1>
                        <div className='content mt-5'>
                            Select whether you want the latest and total cases<br />from a country or continent
                        </div>
                        <div className='content mt-4'>
                            <div>
                                <Zoom in={zoom}>
                                    <Button className={classes.button} color='success' variant="contained" href="/country" endIcon={<FlagIcon />} size="large" >
                                        Country
                                    </Button>
                                </Zoom>
                            </div>
                            <div>
                                <Zoom in={zoom}>
                                    <Button className={classes.button} color='success' variant="contained" href="/continent" endIcon={<PublicIcon />} size="large">
                                        Continente
                                    </Button>
                                </Zoom>
                            </div>
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