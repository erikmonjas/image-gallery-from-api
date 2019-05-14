import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  static propTypes = {
    backgroundImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  style = {
    backgroundImage: `url(${this.props.main_attachment.big})`,
  };
  render() {
    return (
      <div className='card'>
        <div className='card__image' style={this.style} alt={this.props.title} />
        <div className='card__overlay' />
      </div>
    );
  }
}
