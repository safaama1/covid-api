import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function AdminRoute({ children }) {
    const { user } = useContext(AuthContext);

    return !user || user.type !== "Admin"
        ? <Navigate to="/" replace />
        : children;
}

export default AdminRoute;
