import React from 'react';
import Button from '../Utils/Button';

const Register = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Costumer</h1>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <Button 
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyles={{
                margin: '10px 0 0 0'
              }}
            />
          </div>
          <div className="right">
            <h2>Register Customers</h2>
            <p>If you have an account please log in.</p>
            LOGIN
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
//Lecture 91
