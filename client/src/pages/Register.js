import { React, useEffect, useState, useContext } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import gql from 'graphql-tag';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

import '../Register.css';

function Register(props) {
    const context = useContext(AuthContext)
    const navigate = useNavigate();
    const [slidePage, setSlidePage] = useState(false)
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            console.log(userData)
            context.login(userData)
            navigate('/')
        },
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.errors)
            setErrors(err.graphQLErrors[0].extensions.errors)
        }
        , variables: values
    });
    const onSubmit = (event) => {
        event.preventDefault()
        addUser()
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
                <Row className='shadow-lg p-3 mb-5 bg-white rounded'>
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
                                    helperText={errors.password ? "Incorrect Password." : ""}
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
                                    helperText={errors.password ? "Incorrect Password." : ""}
                                    onChange={onChange}
                                    fullWidth
                                />
                            </div>
                            <Button type='submit' color="inherit" variant="contained" size="medium" fullWidth> {
                                loading ? (<CircularProgress />) : (<LoginIcon />)
                            }
                            </Button>
                            <p className="forgot-password text-right mt-2">
                                Already registered? <a href="/login">sign in</a>
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
                    <Col md={7} xs={12}>
                        <Image className="img-fluid px-lg-1 px-md-0 px-sm-4 px-5" src={process.env.PUBLIC_URL + '/images/undraw_authentication_fsn5.svg'} />
                    </Col>
                </Row >
            </Container >
        </Slide >
    );

}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id email username createdAt token
        }
    }
`
export default Register;
