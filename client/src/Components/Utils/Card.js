import React, { Component } from 'react';

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
    let grid = props.grid ? <div className="description">sdfasdfasd</div>: null;
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
        </div>
        {grid}
        <div></div>
      </div>
    );
  }
}

export default Card;