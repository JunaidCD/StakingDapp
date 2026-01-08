import React, { useContext } from 'react';
import Web3Context from '../../context/Web3Context';

const ConnectedAccount = () => {
  const { state, handleDisconnect } = useContext(Web3Context);

  const formatAddress = (address) => {
    if (!address) return 'Not Connected';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (!state?.account) {
    return (
      <div className="connected-account">
        <span>Connect Account</span>
      </div>
    );
  }

  return (
    <div className="account-container">
      <div className="connected-account">
        <span>{formatAddress(state.account)}</span>
      </div>
      <button className="disconnect-btn" onClick={handleDisconnect} title="Disconnect Wallet">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      </button>
    </div>
  );
};

export default ConnectedAccount;
