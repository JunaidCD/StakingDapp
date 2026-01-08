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
        Disconnect wallet
      </button>
    </div>
  );
};

export default ConnectedAccount;
