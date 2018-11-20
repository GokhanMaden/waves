import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome/';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

class FileUpload extends Component {

  constructor() {
    super();

    this.state = {
      uploadedFiles: [],
      uploading: false
    }
  }

  onDrop = (files) => {
    this.setState({uploading: true})
    let formData = new FormData();
    const config = {
      header: {'content-type': 'multipart/form-data'}
    }

    formData.append("file", files[0]);
    axios.post('/api/users/uploadimage', formData, config)
      .then(response => {
        console.log(response.data)
        this.setState({
          uploading: false,
          uploadedFiles: [
            ...this.state.uploadedFiles,
            response.data
          ]
        }, () => {
          this.props.imagesHandler(this.state.uploadedFiles)
        })
      });
  }

  static getDerivedStateFromProps(props, state) {
    if(props.reset) {
      return state = {
        uploadedFiles: []
      }
    }
  }

  onRemove = (id) => {
    axios.get(`/api/users/removeimage?public_id=${id}`).then(response => {
      console.log(this.state.uploadedFiles);
      let images = this.state.uploadedFiles.filter(item => {
        return item.public_id !== id;
      });

      this.setState({
        uploadedFiles: images
      },() => {
        this.props.imagesHandler(images);
      })
    })
  }

  showUploadedImages = () => (
    this.state.uploadedFiles.map(item => (
      <div className="dropzone_box" 
        key={item.public_id}
        onClick={() => this.onRemove(item.public_id)}
      >
        <div 
          className="wrap"
          style={{background: `url(${item.url}) no-repeat`}}
        >
        </div>
      </div>
    ))
  )

  render() {

    const progressBar = this.state.uploading ? 
      <div
        className="dropzone_box"
        style={{
          textAlign: 'center',
          paddingTop: '60px'
        }}
      >
        <CircularProgress 
          style={{
            color: '#00bcd4'
          }}
          thickness={7}
        />
      </div> : null;
    return (
      <div>
        <section>
          <div className="dropzone clear">
            <Dropzone
              onDrop={(event) => this.onDrop(event)}
              multiple={false}
              className=" dropzone_box"
            >
              <div className="wrap">
                <FontAwesomeIcon icon={faPlusCircle}/>
              </div>
            </Dropzone>
            { this.showUploadedImages() }
            { progressBar }
          </div>
        </section>
      </div>
    );
  }
}

export default FileUpload;
