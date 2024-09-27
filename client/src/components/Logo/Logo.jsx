import React from 'react';
import EzRentalLogo from '../../assets/EzRental Transparente v2.webp';
import { Link } from 'react-router-dom';
import './logoStyles.css';

function Logo() {
  return (
    <Link to={'/'}>
      <div className='logo-container'>
        <img src={EzRentalLogo} alt="logo lizardtech S.R.L" className='logo__img' />
        {/* <p className='title-logo'>EZ RENTAL</p> */}
      </div>
    </Link>
  );
};


export default Logo;