import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import jwt from 'utils/jwt';

const LoginRoute = (props) => {
    return (
        jwt.isAuthorized() ? <Redirect to="/" /> : <Route {...props} /> 
    )
}

export default LoginRoute;