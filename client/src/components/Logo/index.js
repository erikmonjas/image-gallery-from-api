import React from 'react';
import PropTypes from 'prop-types';
import LogoSrc from '../../images/ek-logo.png';

const Logo = ({ className, dimensions }) => {
  return <img src={LogoSrc} className={className} alt='Logo Érik Monjas' />;
};

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
