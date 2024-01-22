import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Contract, ethers } from 'ethers';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { contractABI, contractAddress } from '../constants';
import { truncate } from '../helpers';
import styles from '../styles/Home.module.css';
import { CustomConnectButton } from '../components/NavButton';
import { Footer } from '../components/Footer';

const btnClassname = "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5";
const btns = ['0.001', '0.005', '0.01', '0.05'];

const CreatorPage: NextPage = () => {
  const rounter = useRouter();
  const { id } = rounter.query;
  const [amount, setAmount] = useState<string>();
  const [comments, setComments] = useState<any[]>();
  const [name, setName] = useState<string>();
  const [text, setText] = useState<string>();
  const [loading, setLoading] = useState<'comments' | 'donate'>();
  const [isCopied, setCopied] = useState<boolean>(false);

  const isLoadingDonate = loading === 'donate';
  const isLoadingComments = loading === 'comments';

  const handleClickDonate = async () => {
    setLoading('donate')
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum as any);
        const signer = provider.getSigner();
        const donutorContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("donation...")
        const donateTxn = await donutorContract.donate(id, name, text, { value: ethers.utils.parseEther(amount!) });

        await donateTxn.wait();

        console.log("mined ", donateTxn.hash);

        console.log("donation complete!");
      

        getComments(id as string);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(undefined);
    }
  };

  useEffect(() => {
    // if (typeof window !== 'undefined') {
    //   window?.gtag("event", "page_visit", {
    //     event_category: "Wallet",
    //     event_label: "Visited",
    //     value: id,
    //   });
    // }
  }, [])

  const getComments = async (id: string) => {
    setLoading('comments');
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum as any);
        const signer = provider.getSigner();
        const donutor = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const resp = await donutor.getComments(id);

        let arr = new Array();
        for (let i = resp.length - 1; i >= 0; i--) {
          arr.push(resp[i]);
        }
        setComments(arr);
      } else {
        console.log("Wallet is not connected");
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(undefined);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`http://donutor.com/${id}`).then(function() {
        console.log('Async: Copying to clipboard was successful!');
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
      setCopied(true);
  }

  useEffect(() => {
    if (id) {
      getComments(id as string);
    }
  }, [id]);

  return (
    <div >
      <Head>
        <title>Donate to {id} | Donutor - web3 crypto donations</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Link href={'/'}><div className={styles.logo}><img src='/logo.svg' /></div></Link>
        <CustomConnectButton currentAddressPage={id} />
      </header>

      <div className="m-auto h-screen pt-24" style={{ maxWidth: 920 }}>
      <main className={`${styles.main} flex flex-col-reverse md:flex-row gap-3 justify-center p-3 md:p-0`}>
        <div className='col-span-2'>
        <section className={`${styles.wall}`}>
          <div className="flex justify-between mb-4 ">
            <span className={`${styles.title} font`}>{truncate(id as string)}</span> <button disabled={isLoadingDonate} onClick={handleCopyLink} className={`${btnClassname} ml-4`}>{isCopied ? 'Copied' : 'Share link'}</button>
          </div>
          <div>
            {isLoadingComments && <div>Loading comments...</div>}
            {!isLoadingComments && !comments?.length && (
              <div className='flex flex-col items-center my-16'>
                <span style={{ fontSize: 120 }}>🍩</span>
                <span className='font font-bold text-center' style={{ fontSize: 32 }}>Zero supporters yet</span>
                <span className='font-bold text-center' style={{ fontSize: 18  }}>Your are one click away from the first donation!</span>
                <span className='text-center' style={{ fontSize: 18 }}>Share this page with your audience</span>
              </div>
            )}
            {!isLoadingComments && comments?.map((comment, i) => {
              return <div key={i} className='flex flex-col border border-gray-200 w-full p-3 mb-3 rounded-2xl'>
                <span className='font-bold'>{comment.name}</span>
                <span>{comment.text}</span>
              </div>
            })}
          </div>
        </section>
        </div>

        <section>
          <div  className={styles.donate}>
          <input placeholder='Amount' disabled={isLoadingDonate} value={amount} onChange={e => setAmount(e.target.value)} type="number" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full block w-full p-2 mb-3' />
          <div className='grid grid-cols-2 gap-3'>
            {btns.map((ethAmount) => (
                <button disabled={isLoadingDonate} key={ethAmount} onClick={() => setAmount(ethAmount)} type="button" className={btnClassname}>{ethAmount} ETH</button>
            ))}
          </div>
          {amount && (
            <form className='flex flex-col pt-3' onSubmit={(e) => {
              e.preventDefault();
              handleClickDonate();
            }}>
            <input placeholder='Your name' disabled={isLoadingDonate} value={name} onChange={e => setName(e.target.value)} required className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full block w-full p-2.5' />
            <textarea placeholder='Comment' maxLength={200} disabled={isLoadingDonate} value={text} onChange={e => setText(e.target.value)} required rows={2} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl block w-full p-2.5 my-2' />
            <button disabled={isLoadingDonate} className={btnClassname}>Donate!</button>
          </form>)}
          {isLoadingDonate && <div className="text-center mt-2">Donation is processing...</div>}
          </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CreatorPage;