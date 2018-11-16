import React from 'react';
import CardBlockShop from '../Utils/CardBlockShop';

const LoadmoreCards = (props) => {
  return (
    <div>
      <div>
        <CardBlockShop 
          grid={props.grid}
          list={props.products}
        />
      </div>
    </div>
  );
}

export default LoadmoreCards;
