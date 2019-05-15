import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LikeButton from '../LikeButton';
import LikeCount from '../LikeCount';

export default class Card extends Component {
  static propTypes = {
    backgroundImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    liked: PropTypes.bool.isRequired,
    _id: PropTypes.string.isRequired,
    likes_count: PropTypes.number.isRequired,
  };

  state = {
    likes_count: this.props.likes_count,
  };

  style = {
    backgroundImage: `url(${this.props.main_attachment.big})`,
  };

  updateLikeCount = likes => {
    this.setState({ likes_count: likes });
  };

  render() {
    return (
      <div className='card'>
        <div className='card__image' style={this.style} alt={this.props.title} />
        <div className='card__overlay'>
          <div className='card__overlay-actions'>
            <LikeButton
              liked={this.props.liked}
              id={this.props._id}
              updateLikeCount={this.updateLikeCount}
            />
            <LikeCount likes_count={this.state.likes_count} />
          </div>
        </div>
        <div className='card__content'>
          <h2 className='card__title'>{this.props.title}</h2>
          <p className='card__author'>
            <span className='text-primary-text'>by</span> {this.props.author}
          </p>
        </div>
      </div>
    );
  }
}
