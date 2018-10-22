import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import Layout from './hoc/Layout';
import './setupProxy';

const Routes = () => {
  return(
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  )
}

export default Routes;
