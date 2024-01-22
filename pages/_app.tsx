import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets, darkTheme } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import Script from 'next/script';

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    // chain.goerli
  ],
  [
    alchemyProvider({
      // testnet -> 
      // apiKey: '3S5ysyTh8uIxrLdZEPgxhnAPyyx-sOCh',
      apiKey: 'fbsRjlPaE8fW2wUE0MrfFHpM6nCqBUnY',
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Donutor',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-CB4YX3D7J6`}
      />
    <Script id="google-analytics" strategy="lazyOnload">
      {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CB4YX3D7J6', {
                page_path: window.location.pathname,
              });
                  `}
    </Script>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme({
        borderRadius: 'large',
      })}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
    </>
  );
}

export default MyApp;
