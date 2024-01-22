import type { NextPage } from 'next';
import Head from 'next/head';
import { Footer } from '../components/Footer';
import { GetStartedButton } from '../components/GetStartedButton';
import { CustomConnectButton } from '../components/NavButton';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Donutor - web3 crypto donations</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logo}><img src='/logo.svg' /></div>
        {/* <div className={styles.logo}>🍩 Donutor</div> */}
        <CustomConnectButton currentAddressPage={null} />
      </header>

      <main className="flex justify-center items-center lp-main">
        <div className='flex flex-col items-center'>
          <h1 className='font-bold text-center lp-title'>Collect Donations with&nbsp;Crypto</h1>
          <p className='font-medium inline-block text-center mt-4 lp-subtitle p-4 w-2/3'>Donutor makes supporting fun and easy. In just a couple of taps, your fans can make the payment (donate) and leave a message. They don’t even have to create an account!</p>
          <div className="flex justify-center flex-col mb-5"><span className='lp-step'>Connect Wallet 👛</span> <span className='lp-step'>Share the link 🔗</span> <span className='lp-step'>Accept payments 💸</span></div>
          <GetStartedButton />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
