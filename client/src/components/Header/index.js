import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import SearchBox from '../SearchBox';

export default class Header extends Component {
  static propTypes = {
    getSearchImages: PropTypes.func.isRequired,
  };
  render() {
    return (
      <div>
        <div className={`header d-flex ${this.props.className}`}>
          <div className='container header__container'>
            <div className='row justify-content-between align-items-center header__row'>
              <div className='col-3 col-md-2 col-xl-1'>
                <Logo className='header__logo' />
              </div>
              <div className='col-8 col-sm-7 col-md-5 col-lg-4 col-xl-3'>
                <SearchBox
                  placeholder="You're looking for something?"
                  getSearchImages={this.props.getSearchImages}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
