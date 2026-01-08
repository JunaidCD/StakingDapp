import React, { useContext, useState, useEffect } from 'react';
import Web3Context from '../../context/Web3Context';
import StakingContext from '../../context/StakingContext';
import { ethers } from 'ethers';

const EarnedReward = () => {
  const { state } = useContext(Web3Context);
  const { isReload } = useContext(StakingContext);
  const [earnedReward, setEarnedReward] = useState('0');

  useEffect(() => {
    const fetchEarnedReward = async () => {
      try {
        if (state?.stakingContract && state?.account) {
          const earned = await state.stakingContract.earned(state.account);
          const formattedEarned = ethers.formatUnits(earned, 18);
          setEarnedReward(parseFloat(formattedEarned).toFixed(4));
        }
      } catch (error) {
        console.error('Error fetching earned reward:', error);
      }
    };

    fetchEarnedReward();
  }, [state?.stakingContract, state?.account, isReload]);

  return (
    <div className="earned-reward">
      <label>Earned Reward:</label>
      <span>{earnedReward}</span>
    </div>
  );
};

export default EarnedReward;
