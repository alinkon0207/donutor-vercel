import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';

export const CustomConnectButton = ({ currentAddressPage }: any) => {
    const router = useRouter();

    const goToProfile = (id: string) => {
      router.push(`/${id}`)
    };
    
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className='btn'>
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button" className='btn'>
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={openAccountModal} type="button" className='btn'>
                    {account.displayName}
                  </button>
                  {currentAddressPage !== account.address && (
                    <button onClick={() => goToProfile(account.address)} type="button" className='btn my-page-btn'>
                        My Page
                    </button>
                  )}
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
