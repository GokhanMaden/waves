import React, { Component } from 'react';
import UserLayout from '../../../hoc/user'

import FormField from '../../Utils/Form/FormField';
import { update, generateData, isFormValid, populateOptionFields, resetFields } from '../../Utils/Form/FormActions';
import FileUpload from '../../Utils/Form/FileUpload';

import { connect } from 'react-redux';
import { getBrands, getWoods, addProduct, clearProduct } from '../../../store/Actions/product_actions';

class AddProduct extends Component {

  //select component'i yaparken eğer key ve value'ları yanlış atarsak eğer böyle bir hata alıryor ve success false dönüyor. Select component yaratırken key ve value'ları doğru kurgulamak gerekli.
  // "Product validation failed: 
  // brand: Cast to ObjectID failed for value "Ibanez" at path "brand", 
  // shipping: Cast to Boolean failed for value "No" at path "shipping", 
  // available: Cast to Boolean failed for value "Yes" at path "available", 
  // wood: Cast to ObjectID failed for value "Mahogany" at path "wood", 
  // publish: Cast to Boolean failed for value "Public" at path "publish""

  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name:{
        element: 'input',
        value: '',
        config:{
          label: 'Product Name',
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter your product name'
        },
        validation:{
          required: true
        },
        valid: false,
        touch: false,
        validationMessage: '',
        showlabel: true
      },
      description:{
        element: 'textarea',
        value: '',
        config:{
          label: 'Product Description',
          name: 'description_input',
          type: 'text',
          placeholder: 'Enter your description'
        },
        validation:{
          required: true
        },
        valid: false,
        touch: false,
        validationMessage: '',
        showlabel: true
      },
      price:{
        element: 'input',
        value: '',
        config:{
          label: 'Product Price',
          name: 'price_input',
          type: 'number',
          placeholder: 'Enter your product price'
        },
        validation:{
          required: true
        },
        valid: false,
        touch: false,
        validationMessage: '',
        showlabel: true
      },
      brand:{
        element: 'select',
        value: '',
        config:{
          label: 'Product Brand',
          name: 'brand_input',
          options: []
        },
        validation:{
          required: true
        },
        valid: false,
        touch: false,
        validationMessage: '',
        showlabel: true
      },
      shipping:{
        element: 'select',
        value: '',
        config:{
          label: 'Shipping',
          name: 'shipping_input',
          options: [
            {key: true, value: 'Yes'},
            {key: false, value: 'No'}
          ]
        },
        validation:{
          required: true
        },
        valid: false,
        touch: false,
        validationMessage: '',
        showlabel: true
      },
      available:{
        element: 'select',
        value: '',
        config:{
          label: 'Available, in stock',
          name: 'available_input',
          options: [
            {key: true, value: 'Yes'},
            {key: false, value: 'No'}
          ]
        },
        validation:{
          required: true
        },
        valid: false,
        touch: false,
        validationMessage: '',
        showlabel: true
      },
      wood:{
        element: 'select',
        value: '',
        config:{
          label: 'Wood Material',
          name: 'wood_input',
          options: []
        },
        validation:{
          required: true
        },
        valid: false,
        touch: false,
        validationMessage: '',
        showlabel: true
      },
      frets:{
        element: 'select',
        value: '',
        config:{
          label: 'Frets',
          name: 'frets_input',
          options: [
            {key: 20, value: 20},
            {key: 21, value: 21},
            {key: 22, value: 22},
            {key: 24, value: 24},
          ]
        },
        validation:{
          required: true
        },
        valid: false,
        touch: false,
        validationMessage: '',
        showlabel: true
      },
      publish:{
        element: 'select',
        value: '',
        config:{
          label: 'Publish',
          name: 'publish_input',
          options: [
            {key: true, value: 'Public'},
            {key: false, value: 'Hidden'}
          ]
        },
        validation:{
          required: true
        },
        valid: false,
        touch: false,
        validationMessage: '',
        showlabel: true
      },
      images: {
        value: [],
        validation:{
          required: false
        },
        valid: true,
        touch: false,
        validationMessage: '',
        showlabel: false
      }
    }
  }

  componentDidMount() {

    const formdata = this.state.formdata;

    this.props.dispatch(getBrands()).then(response => {
      const newFormData = populateOptionFields(formdata, this.props.products.brands, 'brand');
      this.updateFields(newFormData);
    });

    this.props.dispatch(getWoods()).then(response => {
      const newFormData = populateOptionFields(formdata, this.props.products.woods, 'wood');
      this.updateFields(newFormData);
    });
  }

  updateFields = (newFormData) => {
    this.setState({
      formdata: newFormData
    })
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'products')

    this.setState({
      formError: false,
      formdata: newFormdata
    })
  }

  resetFieldsHandler = () => {

    const newFormData = resetFields(this.state.formdata, 'products');
    this.setState({
      formSuccess: true,
      formdata: newFormData
    })

    setTimeout(() => {
      this.setState({
        formSuccess: false
      },() => {
        this.props.dispatch(clearProduct())
      })
    }, 3000)
  }

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'products');
    let formIsValid = isFormValid(this.state.formdata, 'products');

    if(formIsValid) {
      this.props.dispatch(addProduct(dataToSubmit))
        .then(() => {
          if(this.props.products.addProduct.success) {
            this.resetFieldsHandler();
          } else {
            this.setState({
              formError: true
            })
          }
        })
        .catch(error => {
          this.setState({
            formError: error
          })
        })
    } else {
      this.setState({
        formError: true
      })
    }
  }

  imagesHandler = (images) => {
    const newFormData = { ...this.state.formdata}

    newFormData['images'].value = images;
    newFormData['images'].valid = true;

    this.setState({
      formdata: newFormData
    })

    console.log("imagesHandler içinden gelen formdata: ",this.state.formdata);
  }

  render() {

    const error = this.state.formError ? 
      <div className="error_label">
        Please check your fields.
      </div> : null;

    const success = this.state.formSuccess ? 
      <div className="form_success">
        Product added.
      </div> : null;

    return (
      <UserLayout>
        <div>
          <h1>Add Product</h1>
          <form onSubmit={(event) => this.submitForm(event)}>

            <FileUpload 
              imagesHandler={(images) => this.imagesHandler(images)}
              reset={this.state.formSuccess}
            />
            <FormField 
              id={'name'}
              formdata={this.state.formdata.name}
              change={(element) => this.updateForm(element)}
            />
            <FormField 
              id={'description'}
              formdata={this.state.formdata.description}
              change={(element) => this.updateForm(element)}
            />
            <FormField 
              id={'price'}
              formdata={this.state.formdata.price}
              change={(element) => this.updateForm(element)}
            />

            <div className="form_devider"></div>

            <FormField 
              id={'brand'}
              formdata={this.state.formdata.brand}
              change={(element) => this.updateForm(element)}
            />

            <FormField 
              id={'shipping'}
              formdata={this.state.formdata.shipping}
              change={(element) => this.updateForm(element)}
            />

            <FormField 
              id={'available'}
              formdata={this.state.formdata.available}
              change={(element) => this.updateForm(element)}
            />

            <div className="form_devider"></div>

            <FormField 
              id={'wood'}
              formdata={this.state.formdata.wood}
              change={(element) => this.updateForm(element)}
            />

            <FormField 
              id={'frets'}
              formdata={this.state.formdata.frets}
              change={(element) => this.updateForm(element)}
            />

            <div className="form_devider"></div>

            <FormField 
              id={'publish'}
              formdata={this.state.formdata.publish}
              change={(element) => this.updateForm(element)}
            />
            {success}
            {error}
            <button onClick={(event) => this.submitForm(event)}>Add Product</button>
          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(AddProduct);
