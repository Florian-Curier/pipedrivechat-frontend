import styles from '../styles/AlertDetails.module.css';
import Link from 'next/link';

function AlertDetails() {
    let data = [
        {
            message_text: "Un nouveau deal a été créé le 01/01/2024 pour la société LA CAPSULE", 
            pipedrive_event: "New deal",
            google_response_status: "Delivery",
            google_error_message: "RAS",
            creation_date : "03/01/2024 - 14h23",
            interactions: 2,
        },
        {
            message_text: "Un nouveau deal a été créé le 01/01/2024 pour la société LA CAPSULE", 
            pipedrive_event: "New deal",
            google_response_status: "Delivery",
            google_error_message: "RAS",
            creation_date : "03/01/2024 - 14h23",
            interactions: 2,
        },
        {
            message_text: "Un nouveau deal a été créé le 01/01/2024 pour la société LA CAPSULE", 
            pipedrive_event: "New deal",
            google_response_status: "Not Delivery",
            google_error_message: "Error lors de l'envoi du message",
            creation_date : "03/01/2024 - 14h23",
            interactions: 2,
        },
        {
            message_text: "Un nouveau deal a été créé le 01/01/2024 pour la société LA CAPSULE", 
            pipedrive_event: "New deal",
            google_response_status: "Delivery",
            google_error_message: "RAS",
            creation_date : "03/01/2024 - 14h23",
            interactions: 2,
        },
        {
            message_text: "Un nouveau deal a été créé le 01/01/2024 pour la société LA CAPSULE", 
            pipedrive_event: "New deal",
            google_response_status: "Delivery",
            google_error_message: "RAS",
            creation_date : "03/01/2024 - 14h23",
            interactions: 2,
        },
        {
            message_text: "Un nouveau deal a été créé le 01/01/2024 pour la société LA CAPSULE", 
            pipedrive_event: "New deal",
            google_response_status: "Delivery",
            google_error_message: "RAS",
            creation_date : "03/01/2024 - 14h23",
            interactions: 2,
        },
        {
            message_text: "Un nouveau deal a été créé le 01/01/2024 pour la société LA CAPSULE", 
            pipedrive_event: "New deal",
            google_response_status: "Delivery",
            google_error_message: "RAS",
            creation_date : "03/01/2024 - 14h23",
            interactions: 2,
        },
        {
            message_text: "Un nouveau deal a été créé le 01/01/2024 pour la société LA CAPSULE", 
            pipedrive_event: "New deal",
            google_response_status: "Not Delivery",
            google_error_message: "Error lors de l'envoi du message",
            creation_date : "03/01/2024 - 14h23",
            interactions: 2,
        },
        {
            message_text: "Un nouveau deal a été créé le 01/01/2024 pour la société LA CAPSULE", 
            pipedrive_event: "New deal",
            google_response_status: "Delivery",
            google_error_message: "RAS",
            creation_date : "03/01/2024 - 14h23",
            interactions: 2,
        },
        {
            message_text: "Un nouveau deal a été créé le 01/01/2024 pour la société LA CAPSULE", 
            pipedrive_event: "New deal",
            google_response_status: "Delivery",
            google_error_message: "RAS",
            creation_date : "03/01/2024 - 14h23",
            interactions: 2,
        },
    ]

    let listLogs = data.map(log => {
        let styleItem = {backgroundColor: 'rgba(45, 134, 71, 0.75)'}
        if(log.google_response_status === "Not Delivery"){
            styleItem = {backgroundColor: 'rgba(216, 60, 56, 0.75)'}
        }

        return (
            <div className={styles.logsItem} style={styleItem}>
                <div className={styles.logsSubItem}><p>{log.pipedrive_event}</p></div>
                <div className={styles.logsSubItem}><p>{log.creation_date}</p></div>
                <div className={styles.logsSubItem}><p>{log.message_text}</p></div>
                <div className={styles.logsSubItem}><p>{log.google_response_status}</p></div>
                <div className={styles.logsSubItem}><p>{log.google_error_message}</p></div>
            </div>
        )
    })

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
                <div className={styles.logsSubItem}><p>PIPEDRIVE EVENT</p></div>
                <div className={styles.logsSubItem}><p>DATE CREATE MESSAGE</p></div>
                <div className={styles.logsSubItem}><p>CONTENT MESSAGE</p></div>
                <div className={styles.logsSubItem}><p>GOOGLE STATUS</p></div>
                <div className={styles.logsSubItem}><p>INFOS</p></div>
            </div>

            <div className={styles.logsListItems}>
                {listLogs}
            </div>
        </div>
    </div>
    )
}

export default AlertDetails;