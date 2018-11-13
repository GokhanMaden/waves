import React, { Component } from 'react';
import HomeSlider from './HomeSlider';
import HomePromotion from './HomePromotion';
import CardBlock from '../Utils/CardBlock';

import { connect } from 'react-redux';
import { getProductsByArrival, getProductsBySell} from '../../Redux/Actions/product_actions'

class Home extends Component {

  componentDidMount() {
    this.props.dispatch(getProductsBySell())
    this.props.dispatch(getProductsByArrival())
  }

  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock 
          list={this.props.products.bySell}
          title="Best Selling Guitars"
        />
        <HomePromotion />
        <CardBlock 
          list={this.props.products.byArrival}
          title="Best Selling Guitars"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Home);
