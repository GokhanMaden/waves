import React from 'react'

const FormField = ({formdata, change, id}) => {

  const showError = () => {
    let errorMessage = null;

    if(formdata.validation && !formdata.valid) {
      errorMessage = (
        <div className="error_label">
          {formdata.validationMessage}
        </div>
      )
    }

    return errorMessage;
  }

  const renderTemplate = () => {
    let formTemplate = null;

    switch(formdata.element) {
      case('input'):
        formTemplate = (
          <div className="form_block">

          { formdata.showlabel ? 
            <div className="label_inputs">{formdata.config.label}</div>: null
          }
            <input 
              {...formdata.config} 
              value={formdata.value} 
              onBlur={(event) => change({event, id, blur: true})}
              onChange={(event) => change({event, id})}/>
            {showError()}
          </div>
        )
      break;
      case('textarea'):
        formTemplate = (
          <div className="form_block">

            { formdata.showlabel ? 
              <div className="label_inputs">{formdata.config.label}</div>: null
            }
            <textarea 
              {...formdata.config} 
              value={formdata.value} 
              onBlur={(event) => change({event, id, blur: true})}
              onChange={(event) => change({event, id})}/>
            {showError()}
          </div>
        )
      break;
      case('select'):
        formTemplate = (
          <div className="formblock">

            { formdata.showlabel ? 
              <div className="label_inputs">{formdata.config.label}</div>: null
            }
            <select 
              value={formdata.value} 
              onBlur={(event) => change({event, id, blur: true})}
              onChange={(event) => change({event, id})}
            >
              <option value="">Please select</option>
              {
                formdata.config.options.map((item) => (
                  <option 
                    key={item.key} 
                    value={item.key}
                  >{item.value}</option>
                ))
              }
            </select>
          </div>
        )
      break;
      default: 
        formTemplate = null
    }

    return formTemplate;
  }

  return (
    <div>
      {renderTemplate()}
    </div>
  )
}

export default FormField
