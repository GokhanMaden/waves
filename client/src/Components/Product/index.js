import React, { Component } from 'react';
import PageTop from '../Utils/PageTop';
import ProdInfo from './ProdInfo';
import ProdImg from './ProdImg';

import { connect } from 'react-redux';
import { getProductDetail, clearProductDetail } from '../../store/Actions/product_actions'

class Product extends Component {

  componentDidMount(){
    const id = this.props.match.params.id;
    this.props.dispatch(getProductDetail(id)).then(response => {

      if(!this.props.products.prodDetail) {
        this.props.history.push('/');
      }
    })
  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }
  render() {

    const productDetail = this.props.products.prodDetail ?
      <div className="product_detail_wrapper">
        <div className="left">
          <div style={{ width: '500px'}}>
            <ProdImg 
              detail={this.props.products.prodDetail}
            />
          </div>
        </div>
        <div className="right">
          <ProdInfo 
            addCart={(id) => this.addToCartHandler(id)}
            detail={this.props.products.prodDetail}
          />
        </div>
      </div>
      : "Loading..";
    return (
      <div>
        <PageTop title="Product Detail"/>
        <div className="container">
          {productDetail}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products 
  }
}

export default connect(mapStateToProps)(Product);
