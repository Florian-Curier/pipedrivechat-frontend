import styles from '../styles/Header.module.css'
import Link from 'next/link';

function Header() {
    return (
        <header className={styles.container}>
			<Link href="/alert"><span className={`${styles.link} ${styles.active}`}>Alerts</span></Link>
            <Link href="/dashboard"><span className={styles.link}>Dashboard</span></Link>
            <Link href="/usageStatistics"><span className={styles.link}>Usage statistics</span></Link>
            <span className={styles.link}>User button</span>
		</header >
    )
}

export default Header;
