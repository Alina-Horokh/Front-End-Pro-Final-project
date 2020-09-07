import React from 'react';
import './logo.component.css';
import logo from './logo.svg';
import logoIntro from './logo_intro.svg';

function logoHeader() {
  return ( 
    <div className='logo'>
      <img src={logo} className='App-logo' alt='logo'></img>
      <img src={logoIntro} className='App-logo' alt='logoIntro'></img>
    </div>
  );
}

export default logoHeader;