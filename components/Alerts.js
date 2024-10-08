import styles from '../styles/Alerts.module.css'
import AppExtensionsSDK, { Command } from "@pipedrive/app-extensions-sdk";
import Alert from './Alert';
import ModalCreateAlert from './ModalCreateAlert';
import ModalHelp from './ModalHelp';
import Notification from './Notification';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { updateAlertsInStore } from '../reducers/alerts'

function Alerts() {
    const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

    const user = useSelector((state) => state.user.value);
    const alerts = useSelector((state) => state.alerts.value);
    const [notificationInfo, setNotificationInfo] = useState(null)

    const dispatch = useDispatch()
    console.log("reducer: ", alerts)
    const router = useRouter()


    useEffect(() => {
            if(!user.google_email && !user.pipedrive_user_id) {
              router.push('/')
            } 
          },[router]) 

    useEffect(() => {
        fetch(`${NEXT_PUBLIC_BACKEND_URL}/alerts/${user?.pipedrive_company_id}/${user?.pipedrive_user_id}`)
            .then(response => response.json())
            .then(alertData => {
                dispatch(updateAlertsInStore(alertData.alerts))
               
            });

    }, []);

    function handleNotificationInfo(type, message) {
setNotificationInfo( {type, message })
    }

    let alertsRows = []
    if(alerts){
        let sortAlerts = [...alerts]
        sortAlerts.sort((a,b) => {
            return a.creation_date - b.creation_date
        })
        alertsRows = alerts.map((val, key) => <Alert key={key} alert={val} handleNotificationInfo={handleNotificationInfo}/>);
    }

    return (
        <>
        <div className={styles.notification}>
        {notificationInfo && <Notification type={notificationInfo.type} message={notificationInfo.message} />}
        </div>
        <div className={styles.container}>
            <div className={styles.configcontent}>
                <div>
                <div className={styles.configheading}>

                    <h2 className={styles.maintitle}>Configure my alerts</h2>
                    <p className={styles.sectionparagraph}>Create and configure custom alerts that will be sent to
                        Google Chat when specific conditions are met in Pipedrive.</p>
                </div>

                <div className={styles.alertsTableContainer}>

                    <div className={styles.tableHeader}>
                        <span className={styles.tableHeaderTitle}>NAME</span>
                        <span className={styles.tableHeaderTitle}>TRIGGER</span>
                        <span className={styles.tableHeaderTitle}>CHANNEL</span>
                        <span className={styles.tableHeaderTitle}>ACTION</span>
                    </div>

                    <div className={styles.tableContent}>
                        {alertsRows}
                    </div>

                    <div className={styles.tableNewAlert}>
                        <ModalCreateAlert type="new" handleNotificationInfo={handleNotificationInfo} />
                    </div>
                    </div>
                   
                </div>
                <div className={styles.configfooter}>
                        <div className={styles.helpsection}>
                            {/* <p className={styles.helptext}>Need Help</p>
                            <FontAwesomeIcon icon={faCircleQuestion} className={styles.helpicon} /> */}
                            <ModalHelp />
                        </div>
                       
                    </div>
            </div>
        </div>
        </>
    );
}

export default Alerts;