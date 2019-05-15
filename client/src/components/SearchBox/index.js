import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchIconSrc from '../../images/icon_search.png';

export default class SearchBox extends Component {
  static propTypes = {
    getSearchImages: PropTypes.func.isRequired,
  };

  state = {
    searchValue: '',
  };

  handleChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.getSearchImages(this.state.searchValue);
  };

  render() {
    const { placeholder } = this.props;
    return (
      <form className='search-box' onSubmit={this.handleSubmit}>
        <button type='submit'>
          <img src={SearchIconSrc} alt='search input' className='search-box__icon' />
        </button>
        <input
          type='text'
          className={`search-box__input`}
          placeholder={placeholder}
          value={this.state.searchValue}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}
