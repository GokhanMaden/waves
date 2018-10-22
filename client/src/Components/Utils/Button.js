import React from 'react';
import { Link } from 'react-router-dom'

const Button = (props) => {

  const button = () => {
    let template = '';

    switch(props.type) {
      case 'default': 
        template = <Link 
            className="link_default"
            to={props.linkTo}
            {...props.addStyles}
          >{props.title}</Link>
      break;
      default:
        template= '';
    }

    return template;
  }
  return (
    <div className="my_link">
      {button()}
    </div>
  );
}

export default Button;
