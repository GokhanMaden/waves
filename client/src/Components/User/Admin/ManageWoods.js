import React, { Component } from 'react';
import FormField from '../../Utils/Form/FormField';
import { update, generateData, isFormValid, resetFields } from '../../Utils/Form/FormActions';
import { connect } from 'react-redux';
import { getBrands, getWoods, addProduct, clearProduct } from '../../../Redux/Actions/product_actions';

class ManageWoods extends Component {
  render() {
    return (
      <div>
        ManageWoods
      </div>
    );
  }
}

export default ManageWoods;
