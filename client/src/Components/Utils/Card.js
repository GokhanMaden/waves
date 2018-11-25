import React, { Component } from 'react';
import Button from '../Utils/Button';
import { connect } from 'react-redux';
//related to product but its depends on user!
import { addToCart } from '../../store/Actions/user_actions';

class Card extends Component {

  renderCardImage(images) {
    if (images.length > 0) {
      return images[0].url
    } else {
      return '/images/image_not_availble.png'
    }
  }
  render() {

    const props = this.props;
    let grid = props.grid ? <div className="description">{props.description}</div>: null;
    return (
      <div className={`card_item_wrapper ${props.grid}`}>
        <div className="image" style={{
          background: `url(${this.renderCardImage(props.images)}) no-repeat`
        }}></div>
        <div className="action_container">
          <div className="tags">
            <div className="brand">{props.brand.name}</div>
            <div className="name">{props.name}</div>
            <div className="brand">${props.price}</div>
          </div>
        
          {grid}
          <div className="actions">
            <div className="button_wrapp">
              <Button 
                type="default"
                altClass="card_link"
                title="View Product"
                linkTo={`/product_detail/${props._id}`}
                addStyle={{
                  margin: "10px 0 0 0"
                }}
              />
            </div>
            <div className="button_wrapp">
              <Button 
                type="bag_link"
                runAction={() => {
                  props.user.userData.isAuth ? this.props.dispatch(addToCart(props._id)) : console.log('You need to login');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//Aslında burada çağırmamıza gerek yok fakat user'ın
//authenticated olup olmadığını öğrenmemiz lazım.

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Card);
