import styles from '../styles/AlertDetails.module.css';
import Link from 'next/link';

function AlertDetails() {
    
    return (
    <div className={styles.container}>
        <div className={styles.header}>
            <Link href="/alerts"><span>{'<- Back to alert list'}</span></Link>
            <h1>Alert name</h1>
            <div>
                <button style={{marginRight: '20px'}} className="btnWhite" >Edit</button>
                <button className="btn bgRed" >Delete</button>
            </div>
        </div>

        <div className={styles.infos}>
            <div className={styles.infosBox}>
                <div className={styles.infosSubBox}><p>Créée le : 01/01/2024 à 12h30</p></div>
                <div className={styles.infosSubBox}><p>Modifiée le : 01/01/2024 à 12h30</p></div>
            </div>

            <div className={styles.infosBox}>
            <div className={styles.infosSubBox}><p>Trigger : New deal</p></div>
            <div className={styles.infosSubBox}><p>Channel : Channel 1</p></div>
            </div>

            <div className={styles.infosBox}>
            <div className={styles.infosSubBox}><p>Message : Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p></div>
            </div>
        </div>

        <div className={styles.logs}>
            <div className={styles.logsBox}>
                <h2>Logs: </h2>
                <p>Nombre: 2</p>
            </div>

            <div className={styles.logsListTitle}>
                <div className={styles.logsSubItem}><p>DATE PIPEDRIVE EVENT</p></div>
                <div className={styles.logsSubItem}><p>PIPEDRIVE EVENT</p></div>
                <div className={styles.logsSubItem}><p>DATE CREATE MESSAGE</p></div>
                <div className={styles.logsSubItem}><p>CONTENT MESSAGE</p></div>
                <div className={styles.logsSubItem}><p>GOOGLE STATUS</p></div>
                <div className={styles.logsSubItem}><p>INFOS</p></div>
            </div>

            <div className={styles.logsListItems}>
                <div className={styles.logsItem}>
                    <div className={styles.logsSubItem}><p>01/01/2024 - 09h06</p></div>
                    <div className={styles.logsSubItem}><p>New deal</p></div>
                    <div className={styles.logsSubItem}><p>01/01/2024 - 09h07</p></div>
                    <div className={styles.logsSubItem}><p>Un nouveau deal a été créé le 01/01/2024 pour la société LA CAPSULE</p></div>
                    <div className={styles.logsSubItem}><p>Delivery</p></div>
                    <div className={styles.logsSubItem}><p>RAS</p></div>
                </div>

                <div className={styles.logsItem}>
                    <div className={styles.logsSubItem}><p>03/01/2024 - 14h23</p></div>
                    <div className={styles.logsSubItem}><p>New deal</p></div>
                    <div className={styles.logsSubItem}><p>03/01/2024 - 14h24</p></div>
                    <div className={styles.logsSubItem}><p>Un nouveau deal a été créé le 03/01/2024 pour la société LA CAPSULE</p></div>
                    <div className={styles.logsSubItem}><p>Not delivery</p></div>
                    <div className={styles.logsSubItem}><p>Error : Le message n'a pas été délivré, car il y a eu un problème</p></div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default AlertDetails;