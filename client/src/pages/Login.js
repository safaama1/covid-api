import { React, useEffect, useState, useContext } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks'
import { useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../util/graphql';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { AuthContext } from '../context/auth';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import '../css/Register.css';

function Login() {
    const context = useContext(AuthContext)
    const navigate = useNavigate();
    const [slidePage, setSlidePage] = useState(false)
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const [open, setOpen] = useState(false);
    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            console.log(result.data.login)
            context.login(result.data.login)
            navigate('/')
        },
        onError(err) {
            setOpen(false);
            setErrors(err.graphQLErrors[0].extensions.errors)
        }
        , variables: values
    });
    const onSubmit = (event) => {
        setOpen(true);
        event.preventDefault()
        loginUser()
    }
    useEffect(() => {
        setSlidePage(true)
    }, [])
    return (
        <Slide direction="up" in={slidePage} mountOnEnter unmountOnExit timeout={1000}>
            <Container className='mt-5' fluid='xxl'>
                <br />
                <br />
                <br />
                <Row className='shadow-lg p-3 mb-5 bg-white' style={{ borderRadius: "30px" }}>
                    <Col className="mt-3" md={5} xs={12}>
                        <form onSubmit={onSubmit} noValidate>
                            <h3 className='text-center mb-4'>Log In</h3>
                            <div className="form-group mt-3">
                                <TextField
                                    required
                                    id="outlined-basic"
                                    name='username'
                                    label="Username"
                                    variant="outlined"
                                    onChange={onChange}
                                    error={errors.username ? true : false}
                                    helperText={errors.username ? "Incorrect Username." : ""}
                                    fullWidth />
                            </div>
                            <div className="form-group">
                                <TextField
                                    required
                                    id="outlined-password-input"
                                    name='password'
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={onChange}
                                    error={errors.password ? true : false}
                                    helperText={errors.password ? "Incorrect Password." : ""}
                                    fullWidth
                                />
                            </div>
                            <Button type='submit' color="inherit" variant="contained" size="medium" fullWidth>Log In&nbsp;&nbsp;<LoginIcon /></Button>
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={open}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                            <p className="forgot-password text-right mt-2">
                                Not a member? <a href="/register">sign up</a>
                            </p>
                        </form>
                        {Object.keys(errors).length > 0 && (
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                {Object.values(errors).map(value => (
                                    <Alert severity="error" key={value}>{value}</Alert>
                                ))}
                            </Stack>
                        )}
                    </Col>
                    <Col md={7} xs={12} className='mt-3'>
                        <Image className="img-fluid px-lg-1 px-md-0 px-sm-4 px-5" src={process.env.PUBLIC_URL + '/images/undraw_login_re_4vu2.svg'} />
                    </Col>
                </Row >
            </Container >
        </Slide>
    );

}
export default Login;
