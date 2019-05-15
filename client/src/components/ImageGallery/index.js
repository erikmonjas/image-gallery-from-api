import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';

export default class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
  };
  render() {
    return (
      <div className='container'>
        {this.props.images.length > 0 && (
          <div className='row'>
            {this.props.images.map(image => (
              <div className='col-12 col-md-6 col-xl-3' key={image.created_at}>
                <Card {...image} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
