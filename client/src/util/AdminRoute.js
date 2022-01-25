import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/auth';

/* Route to not allow users that aren't logged in
    to access the admin page
    also for users that aren't admins (normal users) */ 

function AdminRoute({ children }) {
    const { user } = useContext(AuthContext);

    return !user || user.type !== "Admin"
        ? <Navigate to="/" replace />
        : children;
}

export default AdminRoute;
