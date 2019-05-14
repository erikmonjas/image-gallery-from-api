import React, { Component } from 'react';
import axios from 'axios';
import Card from '../Card';

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
          {this.state.images.map(image => (
            <div className='col-12 col-md-6 col-lg-3' key={image.created_at}>
              <Card {...image} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
