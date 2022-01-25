import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/auth';

/* Route to not allow users that aren logged in
    to access the login & register pages */ 

function AuthRoute({ children }) {
    const { user } = useContext(AuthContext);

    return user
        ? <Navigate to="/" replace />
        : children;
}

export default AuthRoute;































