import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './setupProxy';

import Layout from './hoc/Layout';
import Auth from './hoc/auth';

import Home from './Components/Home';
import RegisterLogin from './Components/Register';
import Register from './Components/Register/Register';
import UserDashboard from './Components/User';
import Shop from './Components/Shop';
import AddProduct from './Components/User/Admin/AddProduct';
import ManageCategories from './Components/User/Admin/ManageCategories';
import Product from './Components/Product'

const Routes = () => {
  return(
    <Layout>
      <Switch>
        <Route path="/admin/manage_categories" exact component={Auth(ManageCategories,true)} />
        <Route path="/admin/add_product" exact component={Auth(AddProduct,true)} />
        <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)} />
        
        <Route path="/product_detail/:id" exact component={Auth(Product, null)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/register_login" exact component={Auth(RegisterLogin, false)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/" exact component={Auth(Home, null)} />
      </Switch>
    </Layout>
  )
}

export default Routes;
