import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import styles from '../styles/Home.module.css';
import client from "../apolloClient";
import { getCarts, deleteCart } from '../apolloClient/gqlQuery';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-nextjs-toast'

export default function Cart() {

  const router = useRouter();
  const [cart, setCart] = useState([]);

  const deleteFromCart = async (curr) => {
    console.log('curr', curr)
    try {
      await client.mutate({
        mutation: { ...deleteCart },
        variables: { data: [{id: curr.id}] }
      });

      toast.notify(`Product removed from cart`, {
        duration: 5,
        type: "success"
      })

      await AllCarts()
    } catch (err) {
      toast.notify(`unable to remove Product from cart`, {
        duration: 5,
        type: "error"
      })
    }finally {
      setTimeout(() => {
        router.reload(window.location.pathname)
      }, 5000);
    }
  };


  const AllCarts = async () => {
    try {
      const { data } = await client.query({
        query: getCarts,
      });

      setCart(data.carts);
      console.log('paths', data.carts);
    } catch (err) {
      toast.notify(`unable to fetch products in cart`, {
        duration: 5,
        type: "error"
      })
    }
  };


  useEffect(() => {
    AllCarts();
  }, []);


  return (
    <div className={styles.container}>
      <Head>
        <title>Cart</title>
        <meta name="description" content="cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer/>

      <h1 className={`${styles.title} py-5`}>
        <a className='block py-10'>Cart</a>
      </h1>

      <div className='py-10'>
        <button onClick={()=> router.back()}>
          &larr;
          Back
        </button>
      </div>

      <div className={styles.main2}>
        {
          cart && cart.map((curr, idx) => {
            return (

              <div key={idx}>
                <div className={`${styles.card} ${styles.cardw100}`}>
                  <div className='flex flex-row justify-between items-center'>
                    <div className='md:w-8/12'>
                      <h2>
                        <div>
                          {curr?.product[0]?.name}
                          &rarr;
                        </div>
                      </h2>
                      <p className='mt-2'>
                        {curr?.product[0]?.description}
                      </p>
                      <p className='mt-2'>
                        # { curr?.product[0]?.price }
                      </p>
                    </div>

                    <div className='md:w-4/12'>
                      <button className="p-5 bg-red-400" onClick={()=> deleteFromCart(curr)}>DELETE</button>
                    </div>
                  </div>

                </div>
              </div>

            );
          })
        }
      </div>
    </div>
  );
}
