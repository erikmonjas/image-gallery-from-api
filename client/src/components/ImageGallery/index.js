import React, { Component } from 'react';
import axios from 'axios';
import Card from '../Card';
import Loader from '../Loader';

export default class ImageGallery extends Component {
  state = {
    showLoader: true,
    images: [],
    nextPage: '',
    bottomFunctionRunning: false,
    reachedEnd: false,
    bottomText: '',
  };

  componentDidMount() {
    this.getImages(false);
    document.addEventListener('scroll', () => {
      if (!this.state.reachedEnd) {
        if (!this.state.bottomFunctionRunning) {
          if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            this.onBottomReached();
          }
        }
      }
    });
  }

  getImages = async calledFromBottom => {
    this.setState({ showLoader: true });
    if (!calledFromBottom) {
      const response = await axios.get('/images');
      const imageArray = response.data.data;
      this.setState({
        showLoader: false,
        images: imageArray,
        nextPage: response.data.pagination.next,
        reachedEnd: imageArray.length === 0,
      });
    } else {
      const response = await axios.get(this.state.nextPage);
      const imageArray = response.data.data;
      this.setState(prevState => ({
        showLoader: false,
        images: prevState.images.concat(response.data.data),
        nextPage: response.data.pagination.next,
        bottomFunctionRunning: false,
        reachedEnd: imageArray.length === 0,
      }));
    }

    return true;
  };

  onBottomReached = () => {
    this.setState({ showLoader: true, bottomFunctionRunning: true });
    this.getImages(true);
  };

  render() {
    return (
      <div className='container'>
        {this.state.images.length > 0 && (
          <div className='row'>
            {this.state.images.map(image => (
              <div className='col-12 col-md-6 col-xl-3' key={image.created_at}>
                <Card {...image} />
              </div>
            ))}
          </div>
        )}
        {this.state.showLoader && (
          <div className='mt-20 mb-20'>
            <Loader />
          </div>
        )}
        {this.state.reachedEnd && <p className='text-center m-50'>No more images to show</p>}
      </div>
    );
  }
}
