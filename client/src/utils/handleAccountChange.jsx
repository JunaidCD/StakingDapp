import { connectWallet } from "./connectWallet";

export const handleAccountChange = async (setState) => {
  try {
    const { provider, selectedAccount, stakingContract, stakeTokenContract, chainId } = await connectWallet();
    setState({ provider, account: selectedAccount, stakingContract, stakeTokenContract, chainId });
  } catch (error) {
    console.error("Error changing account:", error.message);
  }
};
