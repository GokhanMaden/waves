import React from 'react';
import Card from './Card';

const CardBlock = (props) => {

  const renderCards = () => (
    props.list ? props.list.map((card, index) => (
      <Card 
        key={index}
        {...card}
      />
    )) : null
  )

  let title = props.title ? 
    <div className="title">
      {props.title}
    </div> : null;

  return (
    <div className="card_block">
      <div className="container">
        {title}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap'
        }}>
          { renderCards(props.list) }
        </div>
      </div>
    </div>
  );
}

export default CardBlock;