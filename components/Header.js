import { useEffect, useState } from 'react';
import styles from '../styles/Header.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';


function Header() {

const router = useRouter();

const path = router.pathname

useEffect(() => {


},[router] )

    return (
        <header className={styles.container}>
			<Link href="/alerts">
             <span className={`${styles.link} ${path ==='/alerts' ? styles.active : ''}`}>Alerts</span>
            </Link>
            <Link href="/dashboard">
            <span  className={`${styles.link} ${path ==='/dashboard' ? styles.active : ''}`}>Dashboard Buisness</span>
            </Link>
            <Link href="/stats">
            <span className={`${styles.link} ${path ==='/stats' ? styles.active : ''}`}>Usage statistics</span>
            </Link>
            <span  className={styles.userIcon}>User button</span>
		</header >
    )
}

export default Header;
