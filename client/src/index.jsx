import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiConfig } from 'wagmi';
import { mainnet, arbitrum } from 'wagmi/chains';
import App from "./App";
import { inject } from "@vercel/analytics";

// 0. Setup queryClient


// 1. Get projectId from https://cloud.walletconnect.com
const projectId = 'da1f6e845cb63aa084c3636cf412ab0d';

// 2. Create wagmiConfig
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet, arbitrum];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// 3. Create modal
createWeb3Modal({
  metadata,
  wagmiConfig,
  projectId, // Optional - defaults to your Cloud configuration
});

// Setup router
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/:uri", element: <App /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      
        <RouterProvider router={router} />
    
    </WagmiConfig>
  </React.StrictMode>
);

// Initialize Vercel analytics
inject();
