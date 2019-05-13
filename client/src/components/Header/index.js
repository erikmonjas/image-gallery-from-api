import React from 'react';
import Logo from '../Logo';
import SearchBox from '../SearchBox';

const Header = () => {
  return (
    <div className='header d-flex'>
      <div className='container header__container'>
        <div className='row justify-content-between align-items-center header__row'>
          <div className='col-3 col-md-2 col-xl-1'>
            <Logo className='header__logo' />
          </div>
          <div className='col-8 col-sm-7 col-md-5 col-lg-4 col-xl-3'>
            <SearchBox placeholder="You're looking for something?" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
