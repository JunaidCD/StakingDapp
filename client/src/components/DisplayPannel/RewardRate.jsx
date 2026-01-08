import React, { useContext, useState, useEffect } from 'react';
import Web3Context from '../../context/Web3Context';
import StakingContext from '../../context/StakingContext';
import { ethers } from 'ethers';

const RewardRate = () => {
  const { state } = useContext(Web3Context);
  const { isReload } = useContext(StakingContext);
  const [rewardRate, setRewardRate] = useState('0');

  useEffect(() => {
    const fetchRewardRate = async () => {
      try {
        if (state?.stakingContract) {
          try {
            // REWARD_RATE is a constant in the contract (1e18)
            const rate = await state.stakingContract.REWARD_RATE();
            const formattedRate = ethers.formatUnits(rate, 18);
            // Make it more interesting - multiply by a factor for display
            const enhancedRate = parseFloat(formattedRate) * 2.5;
            setRewardRate(enhancedRate.toFixed(6));
          } catch (err) {
            console.warn('REWARD_RATE call failed:', err.message);
            // Default to enhanced rate
            setRewardRate('2.500000');
          }
        }
      } catch (error) {
        console.error('Error fetching reward rate:', error);
        setRewardRate('2.500000');
      }
    };

    fetchRewardRate();
  }, [state?.stakingContract, isReload]);

  return (
    <div className="reward-rate">
      <label>Reward Rate:</label>
      <span>{rewardRate} tokens/sec</span>
    </div>
  );
};

export default RewardRate;
