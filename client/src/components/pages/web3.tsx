import {
    createWeb3Modal,
    defaultConfig,
    useWeb3Modal,
  } from '@web3modal/ethers/react'
  const projectId = import.meta.env.VITE_PROJECT_ID || "6"
  if (!projectId) {
    throw new Error('VITE_PROJECT_ID is not set')
  }
  
  function getBlockchainApiRpcUrl(chainId: number) {
    return `https://rpc.walletconnect.org/v1/?chainId=eip155:${chainId}&projectId=${projectId}`
  }
  
  // 2. Set chains
  const chains = [
    {
      chainId: 1,
      name: 'Ethereum',
      currency: 'ETH',
      explorerUrl: 'https://etherscan.io',
      rpcUrl: getBlockchainApiRpcUrl(1)
    },
    {
      chainId: 42161,
      name: 'Arbitrum',
      currency: 'ETH',
      explorerUrl: 'https://arbiscan.io',
      rpcUrl: getBlockchainApiRpcUrl(42161)
    }
  ]
  
  const ethersConfig = defaultConfig({
    metadata: {
      name: 'AppKit',
      description: 'AppKit Laboratory',
      url: 'https://example.com',
      icons: ['https://avatars.githubusercontent.com/u/37784886']
    },
    defaultChainId: 1
  })
  
  // 3. Create modal
  createWeb3Modal({
    ethersConfig,
    chains,
    projectId,
    enableAnalytics: true,
    themeMode: 'light',
    themeVariables: {
      '--w3m-color-mix': '#00DCFF',
      '--w3m-color-mix-strength': 20
    }
  })
  
  export default function Web3() {
    // 4. Use modal hook
    const modal = useWeb3Modal()
  
    return (
      <>
        <w3m-network-button />
        <w3m-connect-button />
        <w3m-account-button />
  
        <button onClick={() => modal.open()}></button>
        <button onClick={() => modal.open({ view: 'Networks' })}></button>
      
      </>
    )
  }