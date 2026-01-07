import React from 'react';
import StakedAmount from './StakedAmount';
import RewardRate from './RewardRate';
import EarnedReward from './EarnedReward';
import './DIsplayPannel.css';

const DisplayPanel = () => {
  return (
    <div className="display-panel">
      <StakedAmount />
      <RewardRate />
      <EarnedReward />
    </div>
  );
};

export default DisplayPanel;
