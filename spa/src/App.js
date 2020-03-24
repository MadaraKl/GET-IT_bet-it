import React from 'react';
import LogIn from 'pages/LogIn';
import DefaultLayout from 'components/DefaultLayout';
import {BrowserRouter, Switch} from 'react-router-dom';
import ProtectedRoute from 'components/ProtectedRoute';
import LoginRoute from 'components/LoginRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <LoginRoute exact path="/login" component={LogIn} />
        <ProtectedRoute path="/" component={DefaultLayout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
