import React from 'react';
import './Header.scss';
import Logo from '../../assets/Logo.svg';

const Header = () => {
    return (
      <header className="header">
        <div className="header__logo">
          <img src={Logo} alt="Logo" className="header__logo-image" />
        </div>
        <div className="header__buttons">
          <button className="header__button">Users</button>
          <button className="header__button header__button--signup">Sign up</button>
        </div>
      </header>
    );
  };
  
  export default Header;
  