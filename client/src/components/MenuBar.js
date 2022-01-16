import React, { useContext, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import HomeIcon from '@mui/icons-material/Home';
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../context/auth';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}


const MenuBar = () => {
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
    const classes = useStyles()

    const { user, logout } = useContext(AuthContext)
    const menuBar = user ? (<div className='container mb-5'>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
            <Container>
                <Navbar.Brand className='text-success' href="/" variant="succes">
                    <img
                        alt=""
                        src={process.env.PUBLIC_URL + '/images/covid_icon.ico'}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    &nbsp;COVID-19 Data
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto ">
                    </Nav>
                    <Nav>
                    </Nav>
                    <Nav>
                        <Nav.Link href='/'>
                            <Avatar sx={{ bgcolor: '#21ABAB' }} >
                                {user.username[0]}
                            </Avatar>
                        </Nav.Link>
                    </Nav>

                    <Nav.Link onClick={logout}>
                        <Button className={classes.button} color='success' variant="contained" size="small" >
                            Log out
                        </Button></Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
    ) : (<div className='container mb-5'>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
            <Container>
                <Navbar.Brand className='text-success' href="/" variant="succes">
                    <img
                        alt=""
                        src={process.env.PUBLIC_URL + '/images/covid_icon.ico'}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    &nbsp;COVID-19 Data
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto ">
                        <Nav.Link href="/"><HomeIcon /></Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/register">
                            <Button className={classes.button} color='success' variant="contained" size="small" >
                                Sign Up
                            </Button>
                        </Nav.Link>
                        <Nav.Link eventKey={2} href="/login">
                            <Button className={classes.button} color='success' variant="contained" size="small" >
                                Log In
                            </Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
    )
    return menuBar
}
export default MenuBar;
