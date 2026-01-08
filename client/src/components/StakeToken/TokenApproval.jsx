import React, { useRef, useContext } from 'react';
import { ethers } from 'ethers';
import Web3Context from '../../context/Web3Context';
import Button from '../Button/Button';
import { toast } from 'react-hot-toast';

const TokenApproval = () => {
  const { state } = useContext(Web3Context);
  const { stakeTokenContract } = state;
  const approvalAmountRef = useRef();

  const handleTokenApproval = async (e) => {
    e.preventDefault();
    const amount = approvalAmountRef.current.value.trim();
    
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid positive number');
      return;
    }

    if (!stakeTokenContract) {
      toast.error('Please connect wallet first');
      return;
    }

    try {
      const amountToApprove = ethers.parseUnits(amount, 18).toString();
      const stakingContractAddress = "0x1754bAd9275e9D9719577C4119Ab6eb62F4426a5";
      
      const transaction = await stakeTokenContract.approve(
        stakingContractAddress,
        amountToApprove
      );
      
      await toast.promise(transaction.wait(), {
        loading: 'Transaction is pending...',
        success: 'Token Approved 👌',
        error: 'Approval failed 🤯'
      });
      
      approvalAmountRef.current.value = '';
    } catch (error) {
      console.error('Approval error:', error);
      const errorMessage = error?.reason || error?.message || 'Token Approval Failed';
      toast.error(errorMessage);
    }
  };

  return (
    <form className="token-approval-form" onSubmit={handleTokenApproval}>
      <label>Token Approval:</label>
      <input type="text" ref={approvalAmountRef} placeholder="0" />
      <Button type="submit" label="Token Approval" />
    </form>
  );
};

export default TokenApproval;
