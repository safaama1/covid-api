import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Container from '@mui/material/Container';
import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/auth'
import AuthRoute from './util/AuthRoute'
import Country from './pages/Country';
import Continent from './pages/Continent';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Routes>
            <Route exact path="/" element={<Home />}>
            </Route>
            <Route exact path="/login" element={
              <AuthRoute>
                <Login />
              </AuthRoute>}>
            </Route>
            <Route exact path="/register" element={
              <AuthRoute>
                <Register />
              </AuthRoute>}>
            </Route>
            <Route exact path="/country" element={
              <Country />
            }>
            </Route>
            <Route exact path="/continent" element={
              <Continent />
            }>
            </Route>
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
