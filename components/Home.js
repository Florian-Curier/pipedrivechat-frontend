import { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Spin } from 'antd';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

console.log(NEXT_PUBLIC_BACKEND_URL)

function Home() {
  
  const router = useRouter();
  const user = useSelector((state) => state.user.value)

  let content;


 if(user.google_email && user.pipedrive_user_id) {
      content = <div className={styles.container}><Spin size='xxl'/></div>
      router.push('/alerts')
    } 

if (!user.pipedrive_user_id || !user.google_email){
   
   content = (<div className={styles.container}>
                <h1 className={styles.title}>
                  Welcome to Pipedrivechat
                </h1>
                <p> You need to login to Pipedrive and Google to authorize Pipedrivechat app to send messages </p>
                <button className='btn bgGreen' onClick={() => handleClick()}> Login</button>
              </div>) }

  const handleClick = () => {
    router.push(`${NEXT_PUBLIC_BACKEND_URL}/auth/pipedrive/`)
  }

  return (
    <div >
    {content}
    </div>
  );
}

export default Home;
