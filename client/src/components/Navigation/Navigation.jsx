import React from 'react';
import ConnectedNetwork from './ConnectedNetwork';
import ConnectedAccount from './ConnectedAccount';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <ConnectedNetwork />
      <ConnectedAccount />
    </nav>
  );
};

export default Navigation;
