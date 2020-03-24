import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Matches from 'pages/Matches';
import Profile from 'pages/Profile';
import Wallet from 'pages/Wallet';
import PageNotFound from 'pages/PageNotFound';

const Router = ({ walletAmount, getWalletAmount }) => {
  return (
    <Switch>
           <Route exact path="/">
        <Matches walletAmount={walletAmount} getWalletAmount={getWalletAmount}/>
      </Route>
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/wallet" component={Wallet} />
        <Route exact path="*" component={PageNotFound} />
    </Switch>
      )
    }
    
export default withRouter(Router);