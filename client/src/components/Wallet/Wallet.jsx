import { useState,useEffect } from "react";
import { connectWallet } from "../../utils/connectWallet";
import Web3Context from "../../context/Web3Context";
import Button from "../Button/Button";
import { handleAccountChange } from "../../utils/handleAccountChange";
import { handleChainChange } from "../../utils/handleChainChange";
import { toast } from "react-hot-toast";
import "./Wallet.css";

const Wallet =({children})=>{
 const [state,setState]=useState({
    provider:null,
    account:null,
    stakingContract:null,
    stakeTokenContract:null,
    chainId:null
 })
 const [isLoading,setIsLoading]=useState(false);
 
 useEffect(()=>{
   window.ethereum.on('accountsChanged',()=>handleAccountChange(setState))
   window.ethereum.on('chainChanged',()=>handleChainChange(setState)) 
   
   return()=>{
    window.ethereum.removeListener('accountsChanged',()=>handleAccountChange(setState))
    window.ethereum.removeListener('chainChanged',()=>handleChainChange(setState)) 
   }
},[])
 const handleWallet = async()=>{
    try{
        setIsLoading(true);
        const { provider, selectedAccount, stakingContract, stakeTokenContract, chainId } = await connectWallet();
        setState({provider, account: selectedAccount, stakingContract, stakeTokenContract, chainId})

    }catch(error){
       toast.error("Error connecting wallet")
       console.error(error.message)
    }finally{
        setIsLoading(false)
    }
 }
 // If wallet is connected, show the app with children
 if (state.account) {
   return (
     <Web3Context.Provider value={state}>
       {children}
     </Web3Context.Provider>
   );
 }

 // If not connected, show the connect wallet screen
 return (
   <Web3Context.Provider value={state}>
     <div className="wallet-container">
       <div className="wallet-card">
         <h1 className="wallet-title">Connect Your Wallet</h1>
         <p className="wallet-description">
           Connect your wallet to start staking and earning rewards
         </p>
         {isLoading && <p className="wallet-loading">Connecting...</p>}
         <button 
           onClick={handleWallet} 
           className="wallet-button"
           disabled={isLoading}
         >
           {isLoading ? 'Connecting...' : 'Connect Wallet'}
         </button>
       </div>
     </div>
   </Web3Context.Provider>
 );
}
export default Wallet;