import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default class LikeCount extends Component {
  render() {
    return <p className='like-count'>{this.props.likes_count}</p>;
  }
}
