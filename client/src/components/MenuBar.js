import * as React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVirus } from '@fortawesome/free-solid-svg-icons'
import HomeIcon from '@mui/icons-material/Home';

const MenuBar = () => {
    return (
        <div className='container mb-5'>
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
                            <Nav.Link href="/"><HomeIcon/></Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/register">Sign Up</Nav.Link>
                            <Nav.Link eventKey={2} href="/login">
                                Login
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
export default MenuBar;
