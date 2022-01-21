import React, { useContext, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import HomeIcon from '@mui/icons-material/Home';
import { AuthContext } from '../context/auth';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';


import '../css/Home.css'


function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
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
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
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
                        <Nav.Link href="/"><HomeIcon /></Nav.Link>
                    </Nav>

                    <Nav>
                        {/* if the user is an admin then show a Admin tap 
                        tp show all the users writes to the database  */}
                        {user.type === "Admin" ? (
                            <Nav.Link href="/admin">
                                <Button className={classes.button} color='success' variant="contained" size="small" >
                                    Admin
                                </Button>
                            </Nav.Link>
                        ) : ''}
                        <Nav.Link href='/continent'>
                            <Button className={classes.button} color='success' variant="contained" size="small" >
                                Continent
                            </Button>
                        </Nav.Link>
                        <Nav.Link href='/country'>
                            <Button className={classes.button} color='success' variant="contained" size="small" >
                                Country
                            </Button>
                        </Nav.Link>
                        <Nav.Link onClick={handleClickOpen}>
                            <Button className={classes.button} color='success' variant="contained" size="small" >
                                Log out
                            </Button>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                PaperComponent={PaperComponent}
                                aria-labelledby="draggable-dialog-title"
                            >
                                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                    Subscribe
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Are you sure you want to Logout 
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button autoFocus onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button onClick={logout}>Logout</Button>
                                </DialogActions>
                            </Dialog>
                        </Nav.Link>
                    </Nav>

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
