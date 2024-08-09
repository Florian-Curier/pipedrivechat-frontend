import { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

console.log(NEXT_PUBLIC_BACKEND_URL)

function Home() {
  
  const router = useRouter();
  const user = useSelector((state) => state.user.value)

  useEffect(() => {
    if(user.google_email && user.pipedrive_user_id) {
      router.push('/alerts')
    } 
 
  },[router]) 

  console.log(user)


  const handleClick = () => {
    router.push(`${NEXT_PUBLIC_BACKEND_URL}/auth/pipedrive/`)
  }

  return (
      <div className={styles.container}>
        <h1 className={styles.title}>
          Welcome to Pipedrivechat
        </h1>
        <p> You need to login to Pipedrive and Google to authorize Pipedrivechat app to send messages </p>
        <button className='btn bgGreen' onClick={() => handleClick()}> Login</button>
      </div>
  );
}

export default Home;
