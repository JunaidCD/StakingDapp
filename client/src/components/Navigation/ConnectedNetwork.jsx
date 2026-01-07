import React, { useContext } from 'react';
import Web3Context from '../../context/Web3Context';

const ConnectedNetwork = () => {
  const state = useContext(Web3Context);

  const getNetworkName = (chainId) => {
    const networks = {
      '1': 'Ethereum Mainnet',
      '5': 'Goerli Testnet',
      '11155111': 'Sepolia Testnet',
      '137': 'Polygon',
      '80001': 'Polygon Mumbai',
      '56': 'BSC Mainnet',
      '97': 'BSC Testnet',
      '43114': 'Avalanche',
      '43113': 'Avalanche Testnet',
    };
    return networks[chainId] || 'Unknown Network';
  };

  if (!state?.chainId) {
    return (
      <div className="connected-network">
        <span>Network NOT Detected</span>
      </div>
    );
  }

  return (
    <div className="connected-network">
      <span>{getNetworkName(state.chainId)}</span>
    </div>
  );
};

export default ConnectedNetwork;
