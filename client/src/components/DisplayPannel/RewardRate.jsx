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
            setRewardRate(parseFloat(formattedRate).toFixed(6));
          } catch (err) {
            console.warn('REWARD_RATE call failed:', err.message);
            // Default to 1 token/sec as per contract constant
            setRewardRate('1.000000');
          }
        }
      } catch (error) {
        console.error('Error fetching reward rate:', error);
        setRewardRate('1.000000');
      }
    };

    fetchRewardRate();
  }, [state?.stakingContract, isReload]);

  return (
    <div className="reward-rate">
      <label>Reward Rate:</label>
      <span>{rewardRate} token/sec</span>
    </div>
  );
};

export default RewardRate;
