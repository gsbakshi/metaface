import React from 'react';
import { Link } from 'react-router-dom';

import './navigation.styles.scss';

import { ReactComponent as Logo } from '../../logos/default-monochrome.svg';

const Navigation = () => (
  <div className='nav'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/upload'>
        Sign Out
      </Link>
    </div>
  </div>
);


export default Navigation;
