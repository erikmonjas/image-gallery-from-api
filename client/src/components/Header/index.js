import React from 'react';
import Logo from '../Logo';
import SearchBox from '../SearchBox';

const Header = () => {
  return (
    <div className='header d-flex'>
      <div className='container d-flex'>
        <div className='row align-items-center justify-content-between width-100'>
          <div className='col-4 col-md-3 col-lg-2'>
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
