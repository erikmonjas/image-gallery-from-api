import React, { Component } from 'react';
import SearchIconSrc from '../../images/icon_search.png';

export default class SearchBox extends Component {
  render() {
    const { placeholder } = this.props;
    return (
      <div className='search-box'>
        <img src={SearchIconSrc} alt='search input' className='search-box__icon' />
        <input type='text' className={`search-box__input`} placeholder={placeholder} />
      </div>
    );
  }
}
