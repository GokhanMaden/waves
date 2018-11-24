import React, { Component } from 'react';
import ImageLightBox from '../Utils/ImageLightbox';

class ProdImg extends Component {

  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: []
  }

  componentDidMount() {
    if(this.props.detail.images.length > 0) {
      let lightboxImages = [];

      this.props.detail.images.forEach(item => {
        lightboxImages.push(item.url);
      })

      this.setState({
        lightboxImages
      })
    }
  }

  renderCartImage = (images) => {
    if(images.length > 0) {
      return images[0].url;
    } else {
      return `/images/image_not_availble.png`
    }
  }

  handleLightBox = (position) => {
    if(this.state.lightboxImages.length > 0) {
      this.setState({
        lightbox: true,
        imagePos: position
      })
    }
  }

  handleLightBoxClose = () => {
    this.setState({
      lightbox: false
    })
  }

  showTumbs = () => (
    this.state.lightboxImages.map((item, index) => (
      index > 0 ?
        <div
          key={index}
          onClick={() => this.handleLightBox(index)}
          className="thumb"
          style={{background: `url(${item}) no-repeat`}}
        >

        </div>: null
    ))
  )

  render() {
    const { detail } = this.props;
    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            style={{ background: `url(${this.renderCartImage(detail.images)}) no-repeat`}}
            onClick={() => this.handleLightBox(0)}
          >
          </div>
        </div>
        <div className="main_thumbs">
          {this.showTumbs(detail)}
        </div>
        {
        this.state.lightbox ?
          <ImageLightBox
              id={detail.id}
              images={this.state.lightboxImages}
              open={this.state.open}
              pos={this.state.imagePos}
              onclose={()=> this.handleLightBoxClose()}
          />
        :null
        }
      </div>
    );
  }
}

export default ProdImg;
