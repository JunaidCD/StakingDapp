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
        console.log('=== STAKED AMOUNT DEBUG ===');
        console.log('State:', state);
        
        if (!state?.stakingContract) {
          console.log('❌ Staking contract not available');
          setStakedAmount('0');
          return;
        }
        
        if (!state?.account) {
          console.log('❌ Account not available');
          setStakedAmount('0');
          return;
        }
        
        console.log('Account:', state.account);
        console.log('Contract address:', state.stakingContract.target);
        
        // Method 1: Try totalStaked function
        try {
          const amount = await state.stakingContract.totalStaked(state.account);
          console.log('✅ totalStaked SUCCESS:', amount.toString());
          const formattedAmount = ethers.formatUnits(amount, 18);
          setStakedAmount(parseFloat(formattedAmount).toFixed(4));
          return;
        } catch (err) {
          console.warn('❌ totalStaked failed:', err.message);
        }
        
        // Method 2: Try direct mapping access
        try {
          const result = await state.stakingContract['totalStaked(address)'](state.account);
          console.log('✅ Direct mapping SUCCESS:', result.toString());
          const formattedAmount = ethers.formatUnits(result, 18);
          setStakedAmount(parseFloat(formattedAmount).toFixed(4));
          return;
        } catch (err) {
          console.warn('❌ Direct mapping failed:', err.message);
        }
        
        // Method 3: Try all possible function names
        const possibleFunctions = [
          'balanceOf',
          'userStake', 
          'stakes',
          'getStakedAmount',
          'stakedBalance',
          'userBalance',
          'getUserStake',
          'staked',
          'amountStaked'
        ];
        
        for (const funcName of possibleFunctions) {
          try {
            if (state.stakingContract[funcName] && typeof state.stakingContract[funcName] === 'function') {
              const result = await state.stakingContract[funcName](state.account);
              console.log(`✅ ${funcName} SUCCESS:`, result.toString());
              if (result && result.toString() !== '0') {
                const formattedAmount = ethers.formatUnits(result, 18);
                setStakedAmount(parseFloat(formattedAmount).toFixed(4));
                return;
              }
            }
          } catch (err) {
            console.warn(`❌ ${funcName} failed:`, err.message);
          }
        }
        
        // Method 4: Try to query staking events
        try {
          if (state.stakingContract.filters && state.stakingContract.filters.Staked) {
            const filter = state.stakingContract.filters.Staked(state.account);
            const events = await state.stakingContract.queryFilter(filter);
            console.log('Staked events for user:', events);
            
            if (events.length > 0) {
              // Get the latest staking event
              const latestEvent = events[events.length - 1];
              console.log('Latest staking event:', latestEvent.args);
              if (latestEvent.args && latestEvent.args.amount) {
                const formattedAmount = ethers.formatUnits(latestEvent.args.amount, 18);
                setStakedAmount(parseFloat(formattedAmount).toFixed(4));
                return;
              }
            }
          }
        } catch (err) {
          console.warn('Event query failed:', err.message);
        }
        
        console.log('❌ ALL METHODS FAILED - Setting to 0');
        setStakedAmount('0');
      } catch (error) {
        console.error('❌ FATAL ERROR:', error);
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
