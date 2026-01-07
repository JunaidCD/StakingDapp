import React from 'react';
import ConnectedNetwork from './ConnectedNetwork';
import ConnectedAccount from './ConnectedAccount';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-branding">
        <h1 className="nav-title">StakeOps</h1>
        <p className="nav-tagline">Earn rewards by staking your tokens</p>
      </div>
      <div className="nav-info">
        <ConnectedNetwork />
        <ConnectedAccount />
      </div>
    </nav>
  );
};

export default Navigation;
