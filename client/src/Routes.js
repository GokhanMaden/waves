import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './setupProxy';

import Layout from './hoc/Layout';
import Auth from './hoc/auth';

import Home from './Components/Home';
import RegisterLogin from './Components/Register';
import Register from './Components/Register/Register';
import UserDashboard from './Components/User';

const Routes = () => {
  return(
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/register_login" exact component={Auth(RegisterLogin, false)} />
        <Route path="/" exact component={Auth(Home, null)} />
      </Switch>
    </Layout>
  )
}

export default Routes;
