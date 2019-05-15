import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Header from '../components/Header';
import ImageGallery from '../components/ImageGallery';

export default class HomePage extends Component {
  state = {
    showLoader: true,
    images: [],
    nextPage: '',
    bottomFunctionRunning: false,
    reachedEnd: false,
    matchingImages: [],
    hasSearched: false,
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

  getSearchImages = async searchValue => {
    if (searchValue === '') {
      this.setState({ hasSearched: false });
    } else {
      this.setState({ showLoader: true });
      const matchingImages = await axios.get(`/images/${searchValue}`);
      this.setState({
        matchingImages: matchingImages.data,
        hasSearched: true,
        showLoader: false,
      });
    }
  };

  render() {
    return (
      <>
        <Header className='mb-40' getSearchImages={this.getSearchImages} />
        <ImageGallery
          images={this.state.hasSearched ? this.state.matchingImages : this.state.images}
        />
        {this.state.showLoader && (
          <div className='mt-20 mb-20'>
            <Loader />
          </div>
        )}
        {this.state.hasSearched && this.state.matchingImages.length === 0 && (
          <p className='text-center m-50 text-primary-text'>No matching images</p>
        )}
        {this.state.reachedEnd && !this.state.hasSearched && (
          <p className='text-center m-50 text-primary-text'>No more images to show</p>
        )}
      </>
    );
  }
}
