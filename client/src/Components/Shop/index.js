import React, { Component } from 'react'
import PageTop from '../Utils/PageTop';
import { connect } from 'react-redux';
import { getBrands, getWoods } from '../../Redux/Actions/product_actions';
import CollapseCheckbox from '../Utils/CollapseCheckbox'
import { frets } from '../Utils/Form/FixedCategories';

class Shop extends Component {

  state = {
    grid: '',
    limit: 6,
    skip: 0,
    filters: {
      brands: [],
      frets: [],
      woods: [],
      price: []
    }
  }

  componentDidMount () {
    this.props.dispatch(getBrands());
    this.props.dispatch(getWoods());
  }

  handleFilters = (filters, category) => {
    const newFilters = {...this.state.filters};
    newFilters[category] = filters;

    this.setState({
      filters: newFilters
    })
  }
  render() {

    const products = this.props.products;

    console.log(this.state);

    return (
      <div>
        <PageTop 
          title="Browse Products"
        />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox 
                initState={true}
                title="Brands"
                list={products.brands}
                handleFilters={(filters) => this.handleFilters(filters, 'brands')}
              />
              <CollapseCheckbox 
                initState={false}
                title="Frets"
                list={frets}
                handleFilters={(filters) => this.handleFilters(filters, 'frets')}
              />
              <CollapseCheckbox 
                initState={false}
                title="Woods"
                list={products.woods}
                handleFilters={(filters) => this.handleFilters(filters, 'woods')}
              />
            </div>
            <div className="right">
right
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateFromProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateFromProps)(Shop);
