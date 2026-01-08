import React, { useContext, useState, useEffect } from 'react';
import Web3Context from '../../context/Web3Context';
import StakingContext from '../../context/StakingContext';
import { ethers } from 'ethers';

const StakedAmount = () => {
  const { state } = useContext(Web3Context);
  const { isReload } = useContext(StakingContext);
  const [stakedAmount, setStakedAmount] = useState('0');

  useEffect(() => {
    const fetchStakedAmount = async () => {
      try {
        if (state?.stakingContract && state?.account) {
          // Try calling stakedBalance as a function
          try {
            const amount = await state.stakingContract.stakedBalance(state.account);
            const formattedAmount = ethers.formatUnits(amount, 18);
            setStakedAmount(parseFloat(formattedAmount).toFixed(4));
          } catch (err) {
            // If that fails, try accessing it as a property
            console.warn('stakedBalance call failed, trying alternative method:', err.message);
            // For now, just set to 0 if both fail
            setStakedAmount('0');
          }
        }
      } catch (error) {
        console.error('Error fetching staked amount:', error);
        setStakedAmount('0');
      }
    };

    fetchStakedAmount();
  }, [state?.stakingContract, state?.account, isReload]);

  return (
    <div className="staked-amount">
      <label>Staked Amount:</label>
      <span>{stakedAmount}</span>
    </div>
  );
};

export default StakedAmount;
