import React from 'react';
import ConnectedNetwork from './ConnectedNetwork';
import ConnectedAccount from './ConnectedAccount';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-branding">
        <div className="nav-logo-title">
          <svg className="nav-logo" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <circle cx="16" cy="16" r="16" fill="#627EEA"/>
              <g fill="#FFF" fillRule="nonzero">
                <path d="M16.498 4v8.87l7.497 3.35L16.498 4z"/>
                <path d="M16.498 4L9 16.22l7.498-3.35V4z"/>
                <path d="M16.498 21.968v6.027L24 17.616l-7.502 4.352z"/>
                <path d="M16.498 27.995v-6.027l-7.498-4.352 7.498 10.379z"/>
                <path d="M16.498 20.573l7.497-4.353-7.497-3.348v7.701z"/>
                <path d="M9 16.22l7.498 4.353v-7.701L9 16.22z"/>
              </g>
            </g>
          </svg>
          <h1 className="nav-title">StakeOps</h1>
        </div>
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
