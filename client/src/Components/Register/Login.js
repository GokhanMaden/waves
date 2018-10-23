import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FormField from '../Utils/Form/FormField';
import { update, generateData, isFormValid } from '../Utils/Form/FormActions';
import { loginUser } from '../../Redux/Actions/user_actions';

class Login extends Component {

  state = {
    formError: false,
    formSuccess: '',
    formdata: {
      email:{
        element: 'input',
        value: '',
        config:{
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation:{
          required: true,
          email: true
        },
        valid: false,
        touch: false,
        validationMessage: ''
      },
      password:{
        element: 'input',
        value: '',
        config:{
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation:{
          required: true
        },
        valid: false,
        touch: false,
        validationMessage: ''
      }
    }
  }

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'login');
    let formIsValid = isFormValid(this.state.formdata, 'login');

    if(formIsValid) {
      this.props.dispatch(loginUser(dataToSubmit)).then(response => {
        if(response.payload.loginSuccess) {
          this.props.history.push('/user/dashboard')
        } else {
          this.setState({
            formError: true
          })
        }
      })
    } else {
      this.setState({
        formError: true
      })
    }
  };
  
  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'login');
    this.setState({
      formError: false,
      formdata: newFormdata
    })
  }

  render() {
    const error = this.state.formError ? 
      <div className="error_label">
        Please check your data.
      </div> : null;
    return (
      <div className="sign_wrapper">
        <form onSubmit={(event) => this.submitForm(event)}>
          <FormField 
            id={'email'}
            formdata={this.state.formdata.email}
            change={(element) => this.updateForm(element)}
          />
          <FormField 
            id={'password'}
            formdata={this.state.formdata.password}
            change={(element) => this.updateForm(element)}
          />

          {error}

          <button onClick={(event) => this.submitForm(event)}>LOG IN</button>
        </form>
      </div>
    )
  }
}

export default connect()(withRouter(Login));