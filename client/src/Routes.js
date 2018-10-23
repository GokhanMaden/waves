import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './setupProxy';

import Layout from './hoc/Layout';
import Home from './Components/Home';
import RegisterLogin from './Components/Register';
import Register from './Components/Register/Register';

const Routes = () => {
  return(
    <Layout>
      <Switch>
        <Route path="/register" exact component={Register} />
        <Route path="/register_login" exact component={RegisterLogin} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  )
}

export default Routes;
