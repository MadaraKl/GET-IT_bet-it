import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import jwt from 'utils/jwt';

const ProtectedRoute = (props) => {
    return (
        jwt.isAuthorized() ? <Route {...props} /> : <Redirect to="/login" /> 
    )
}

export default ProtectedRoute;