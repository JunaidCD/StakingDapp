import './App.css'
import { StakingProvider } from './context/StakingContext'
import Navigation from './components/Navigation/Navigation'
import DisplayPanel from './components/DisplayPannel/DisplayPannel'
import StakeAmount from './components/StakeToken/StakeAmount'
import TokenApproval from './components/StakeToken/TokenApproval'
import Withdraw from './components/Withdraw/Withdraw'
import ClaimReward from './components/ClaimReward/ClaimReward'
import Wallet from './components/Wallet/Wallet'

function App() {
  return (
    <Wallet>
      <StakingProvider>
        <div className="app">
          <Navigation />
          <div className="main-content">
            <div className="stats-section">
              <DisplayPanel />
            </div>
            <div className="actions-section">
              <div className="left-column">
                <TokenApproval />
                <StakeAmount />
              </div>
              <div className="right-column">
                <Withdraw />
                <ClaimReward />
              </div>
            </div>
          </div>
        </div>
      </StakingProvider>
    </Wallet>
  )
}

export default App
