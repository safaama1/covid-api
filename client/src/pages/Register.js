import { React, useEffect, useState } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import '../Register.css';

function Register() {
    const [slidePage, setSlidePage] = useState(false)
    useEffect(() => {
        setSlidePage(true)
    }, [])
    return (
        <Slide direction="up" in={slidePage} mountOnEnter unmountOnExit timeout={1000}>
            <Container className='mt-5' fluid='xxl'>
                <br />
                <br />
                <br />
                <Row className='shadow-lg p-3 mb-5 bg-white rounded'>
                    <Col className="mt-3 mb-3" md={5} xs={12}>
                        <form>
                            <h3 className='text-center mb-4'>Sign Up</h3>

                            <div className="form-group mt-3">
                                <TextField required id="outlined-basic" label="Username" variant="outlined" fullWidth />
                            </div>
                            <div className="form-group mt-3">
                                <TextField required id="outlined-basic" label="Email" variant="outlined" fullWidth />
                            </div>
                            <div className="form-group">
                                <TextField
                                    required
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    fullWidth
                                />
                            </div>
                            <div className="form-group">
                                <TextField
                                    required
                                    id="outlined-password-input"
                                    label="Confirm Password"
                                    type="password"
                                    autoComplete="current-password"
                                    fullWidth
                                />
                            </div>
                            <Button color="inherit" variant="contained" size="medium" fullWidth>Sign Up&nbsp;&nbsp;<LoginIcon /></Button>
                            <p className="forgot-password text-right mt-2">
                                Already registered? <a href="/login">sign in</a>
                            </p>
                        </form>
                    </Col>
                    <Col md={7} xs={12}>
                        <Image className="img-fluid px-lg-1 px-md-0 px-sm-4 px-5" src={process.env.PUBLIC_URL + '/images/undraw_authentication_fsn5.svg'} />
                    </Col>
                </Row >
            </Container >
        </Slide>
    );

}
export default Register;
