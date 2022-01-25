import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/auth';

/* Route to not allow users that aren't logged in
    to access the country & continent page */ 


function DataRoute({ children }) {
    const { user } = useContext(AuthContext);

    return !user
        ? <Navigate to="/" replace />
        : children;
}

export default DataRoute;
