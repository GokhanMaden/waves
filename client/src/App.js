import React, { Component } from 'react';
import axios from 'axios';
import './setupProxy';

class App extends Component {

  componentDidMount() {
    axios.get('/api/product/brand').then((response) => {
      console.log(response);
    })
  }
  render() {
    return (
      <div className="App">
      HEY!
      </div>
    );
  }
}

export default App;
