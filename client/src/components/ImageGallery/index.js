import React, { Component } from 'react';
import axios from 'axios';

export default class ImageGallery extends Component {
  state = {
    showLoader: true,
    images: [],
    pagination: {},
  };

  componentDidMount() {
    this.getImages();
  }

  getImages = async () => {
    this.setState({ showLoader: true });
    const response = await axios.get('/images');
    this.setState({
      showLoader: false,
      images: response.data.data,
      pagination: response.data.pagination,
    });
    return response.data;
  };

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            {this.state.images.length > 0 && <p>{this.state.images.length}</p>}
          </div>
        </div>
      </div>
    );
  }
}
