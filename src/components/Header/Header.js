import React from 'react';
import './Header.scss';
import Logo from '../../assets/Logo.svg';

const Header = () => {
    return (
      <header className="header">
        <div className='header_container'>
          <div className="header_logo">
            <img src={Logo} alt="Logo" className="header__logo-image" width="104" />
            
          </div>
          <div className="header_buttons">
            <a href="#users" className="header_button">Users</a>
            <a href="#signup" className="header_button header_button--signup">Sign up</a>
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;
  