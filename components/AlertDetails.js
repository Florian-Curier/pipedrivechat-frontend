import { useState, useEffect } from 'react';
import styles from '../styles/AlertDetails.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

function AlertDetails() {

    const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
    const router = useRouter()
    const dispatch = useDispatch()

    const [alert, setAlert] = useState({});
    const [messages, setMessages] = useState([]);

    const alert_id = router.query.alert_id


    useEffect(() => {

    if (alert_id){
      fetch(`${NEXT_PUBLIC_BACKEND_URL}/alerts/${alert_id}`)
      .then(response => response.json())
      .then (apiData => {
        setAlert(apiData.alert)
      })


      fetch(`${NEXT_PUBLIC_BACKEND_URL}/messages/alert/${alert_id}`)
      .then(response => response.json())
      .then (apiData => {
        setMessages([...apiData.messages])
      })}

    }, [router])

    let listLogs =  messages.map((log, i )=> {
        let styleItem = {backgroundColor: 'rgba(45, 134, 71, 0.75)'}
        if(log.google_response_status !== 200 ){
            styleItem = {backgroundColor: 'rgba(216, 60, 56, 0.75)'}
        }

        return (
            <div key={i} className={styles.logsItem} style={styleItem}>
                <div className={styles.logsSubItem}><p>{moment(log.creation_date).format('MMMM Do YYYY, h:mm:ss a')}</p></div>
                <div className={styles.logsSubItem}><p>{log.message_text}</p></div>
                <div className={styles.logsSubItem}><p>{log.google_response_status === 200 ? 'DELIVERED' : 'NOT DELIVERED'}</p></div>
                <div className={styles.logsSubItem}><p>{log.google_response_details?.error?.status}</p></div>
            </div>
        )
    }) 

    return (
    <div className={styles.container}>
        <div className={styles.header}>
            <Link href="/alerts"><span className={styles.backButton}>{'<- Back to alerts list'}</span></Link>
            <h1>{alert.alert_name}</h1>
            <div>

            </div>
        </div>

        <div className={styles.infos}>
            <div className={styles.infosBox}>
                <div className={styles.infosSubBox}><p className={styles.infoBoxKeyname}>Created on :</p><p> {moment(alert.creation_date).format('MMMM Do YYYY, h:mm:ss a')}</p></div>
                <div className={styles.infosSubBox}><p className={styles.infoBoxKeyname}>Last Updated on :</p><p>{ alert.last_update_date ? moment(alert.last_update_date).format('MMMM Do YYYY, h:mm:ss a') : ''}</p></div>
            </div>

            <div className={styles.infosBox}>
            <div className={styles.infosSubBox}><p className={styles.infoBoxKeyname}>Trigger :</p><p> {alert.trigger_id?.trigger_name}</p></div>
            <div className={styles.infosSubBox}><p className={styles.infoBoxKeyname}>Channel :</p><p> {alert?.google_channel_name}</p></div>
            </div>

            <div className={styles.infosBox}>
            <div className={styles.infosSubBox}><p className={styles.infoBoxKeyname}>Message :</p> <p>{alert?.message}</p>
            </div>
            </div>
        </div>

        <div className={styles.logs}>
            <div className={styles.logsBox}>
                <h2>Logs: </h2>
                <p>Total messages count: {messages.length}</p>
            </div>

            <div className={styles.logsListTitle}>
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