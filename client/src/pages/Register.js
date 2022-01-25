import { React, useEffect, useState, useContext } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { REGISTER_USER } from '../util/graphql'; 
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Backdrop from '@mui/material/Backdrop';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import '../css/Register.css';

function Register(props) {
    const context = useContext(AuthContext)
    const navigate = useNavigate();
    const [slidePage, setSlidePage] = useState(false)
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        type: ''
    })
    const [open, setOpen] = useState(false);
    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            context.login(userData) // check if input valid 
            navigate('/')
        },
        onError(err) {
            // if there is errors then show them under the form
            setOpen(false)
            setErrors(err.graphQLErrors[0].extensions.errors)
        }
        , variables: values
    });
    const onSubmit = (event) => {
        setOpen(true)
        event.preventDefault()
        addUser()
    }
    useEffect(() => {
        setSlidePage(true)
    }, [])
    return (
        <Slide direction="up" in={slidePage} mountOnEnter unmountOnExit timeout={1000}>
            <Container className='mt-5' fluid='xxl' >
                <br />
                <br />
                <br />
                <Row className='shadow-lg p-3 mb-5 bg-white' style={{ borderRadius: "30px" }}>
                    <Col className="mt-3 mb-3" md={5} xs={12}>
                        <form onSubmit={onSubmit} className={loading ? 'loading' : ''} noValidate>

                            <h3 className='text-center mb-4'>Sign Up</h3>

                            <div className="form-group mt-3">
                                <TextField
                                    required
                                    id="outlined-basic"
                                    name='username'
                                    label="Username"
                                    variant="outlined"
                                    value={values.username}
                                    onChange={onChange}
                                    error={errors.username ? true : false}
                                    helperText={errors.username ? "Incorrect Username." : ""}
                                    fullWidth
                                />
                            </div>
                            <div className="form-group mt-3">
                                <TextField
                                    required
                                    id="outlined-basic"
                                    name='email'
                                    label="Email"
                                    variant="outlined"
                                    value={values.email}
                                    onChange={onChange}
                                    error={errors.email ? true : false}
                                    helperText={errors.email ? "Incorrect Email." : ""}
                                    fullWidth
                                />
                            </div>
                            <div className="form-group">
                                <TextField
                                    required
                                    id="outlined-password-input"
                                    name='password'
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={values.password}
                                    onChange={onChange}
                                    error={errors.password ? true : false}
                                    fullWidth
                                />
                            </div>
                            <div className="form-group">
                                <TextField
                                    required
                                    id="outlined-password-input"
                                    name='confirmPassword'
                                    label="Confirm Password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={values.confirmPassword}
                                    error={errors.confirmPassword ? true : false}
                                    onChange={onChange}
                                    fullWidth
                                />
                            </div>
                            <FormLabel component="legend">User Type:</FormLabel>
                            <RadioGroup row aria-label="user" name="row-radio-buttons-group">
                                <FormControlLabel
                                    id="userType"
                                    name='type'
                                    value="User"
                                    control={<Radio />}
                                    label="User"
                                    onChange={onChange}
                                />
                                <FormControlLabel
                                    id="adminType"
                                    name='type'
                                    value="Admin"
                                    control={<Radio />}
                                    label="Admin"
                                    onChange={onChange}
                                />
                            </RadioGroup>
                            <Button type='submit' color="inherit" variant="contained" size="medium" fullWidth> {
                                loading ? (<CircularProgress />) : (<LoginIcon />)
                            }
                            </Button>
                            <p className="forgot-password text-right mt-2">
                                Already registered? <a href="/login">sign in</a>
                            </p>
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={open}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        </form>
                        {Object.keys(errors).length > 0 && (
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                {Object.values(errors).map(value => (
                                    <Alert severity="error" key={value}>{value}</Alert>
                                ))}
                            </Stack>
                        )}
                    </Col>
                    <Col md={7} xs={12}>
                        <Image className="img-fluid px-lg-1 px-md-0 px-sm-4 px-5" src={process.env.PUBLIC_URL + '/images/undraw_authentication_fsn5.svg'} />
                    </Col>
                </Row >
            </Container >
        </Slide >
    );

}

export default Register;
