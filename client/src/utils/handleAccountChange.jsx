import { ethers, Contract } from "ethers";
import stakingAbi from "../ABI/stakingAbi.json"
import stakeTokenAbi from "../ABI/stakeTokenAbi.json";
import { toast } from "react-hot-toast";

export const handleAccountChange = async (setState) => {
  try {
    // Get current accounts without requesting new ones
    const accounts = await window.ethereum.request({
      method: 'eth_accounts'
    });

    if (accounts.length === 0) {
      // No accounts available, disconnect
      setState({
        provider: null,
        account: null,
        stakingContract: null,
        stakeTokenContract: null,
        chainId: null
      });
      toast.success("Wallet disconnected");
      return;
    }

    const selectedAccount = accounts[0];
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Get current chain ID
    const chainIdHex = await window.ethereum.request({
      method: 'eth_chainId'
    });
    const chainId = parseInt(chainIdHex, 16);

    // Initialize contracts
    const stakingContractAddress = "0x1754bAd9275e9D9719577C4119Ab6eb62F4426a5";
    const stakeTokenContractAddress = "0xf8C577c60251B96dfFe43cbACE74Ecb98aDB70Cc";

    const stakingContract = new Contract(stakingContractAddress, stakingAbi, signer);
    const stakeTokenContract = new Contract(stakeTokenContractAddress, stakeTokenAbi, signer);

    setState({ provider, account: selectedAccount, stakingContract, stakeTokenContract, chainId });
    toast.success("Account switched successfully");
  } catch (error) {
    console.error("Error changing account:", error.message);
    toast.error("Failed to switch account");
  }
};
