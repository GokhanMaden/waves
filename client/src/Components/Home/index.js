import React, { Component } from 'react';
import HomeSlider from './HomeSlider';
import HomePromotion from './HomePromotion';
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
        <HomePromotion />
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
