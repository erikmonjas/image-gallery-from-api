import React, { Component } from 'react';

export default class LikeCount extends Component {
  render() {
    return <p className='like-count'>{this.props.likes_count}</p>;
  }
}
