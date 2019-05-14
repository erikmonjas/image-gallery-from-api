import React, { Component } from 'react';

export default class Card extends Component {
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
