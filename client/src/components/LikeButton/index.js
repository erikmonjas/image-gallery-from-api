import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import LikeIconSrc from '../../images/icon_like.png';
import LikedIconSrc from '../../images/icon_liked.png';

export default class LikeButton extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    liked: PropTypes.bool.isRequired,
    updateLikeCount: PropTypes.func,
  };

  state = {
    liked: this.props.liked,
    action: this.props.liked ? 'unlike' : 'like',
  };

  toggleLike = async () => {
    try {
      const actionResponse = await axios.patch('/images', {
        id: this.props.id,
        action: this.state.action,
      });

      this.setState(prevState => ({
        liked: !prevState.liked,
        action: prevState.action === 'like' ? 'unlike' : 'like',
      }));

      if (this.props.updateLikeCount) {
        this.props.updateLikeCount(actionResponse.data.likes_count);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <>
        <button className='like-button' onClick={() => this.toggleLike()}>
          <img src={this.state.liked ? LikedIconSrc : LikeIconSrc} alt='like' />
        </button>
      </>
    );
  }
}
