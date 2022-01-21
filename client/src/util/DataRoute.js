import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function DataRoute({ children }) {
    const { user } = useContext(AuthContext);

    return !user
        ? <Navigate to="/" replace />
        : children;
}

export default DataRoute;
