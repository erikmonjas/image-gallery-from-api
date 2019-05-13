import React, { Component } from 'react';
import Header from '../components/Header';
import ImageGallery from '../components/ImageGallery';

export default class HomePage extends Component {
  render() {
    return (
      <>
        <Header />
        <ImageGallery />
      </>
    );
  }
}
