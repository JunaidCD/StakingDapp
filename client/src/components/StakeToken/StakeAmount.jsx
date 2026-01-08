import React, { useRef, useContext } from 'react';
import { ethers } from 'ethers';
import Web3Context from '../../context/Web3Context';
import StakingContext from '../../context/StakingContext';
import Button from '../Button/Button';
import { toast } from 'react-hot-toast';

const StakeAmount = () => {
  const { state } = useContext(Web3Context);
  const { stakingContract } = state;
  const { isReload, setIsReload } = useContext(StakingContext);
  const stakeAmountRef = useRef();

  const handleStakeToken = async (e) => {
    e.preventDefault();
    const amount = stakeAmountRef.current.value.trim();
    
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid positive number');
      return;
    }

    if (!stakingContract) {
      toast.error('Please connect wallet first');
      return;
    }

    try {
      const amountToStake = ethers.parseUnits(amount, 18).toString();
      const transaction = await stakingContract.stake(amountToStake);
      
      await toast.promise(transaction.wait(), {
        loading: 'Transaction is pending...',
        success: 'Transaction successful 👌',
        error: 'Transaction failed 🤯'
      });
      
      stakeAmountRef.current.value = '';
      setIsReload(!isReload);
    } catch (error) {
      console.error('Staking error:', error);
      const errorMessage = error?.reason || error?.message || 'Staking Failed';
      toast.error(errorMessage);
    }
  };

  return (
    <form className="stake-amount-form" onSubmit={handleStakeToken}>
      <label>Enter Staked Amount:</label>
      <input type="text" ref={stakeAmountRef} placeholder="0" />
      <Button type="submit" label="Stake Token" />
    </form>
  );
};

export default StakeAmount;
