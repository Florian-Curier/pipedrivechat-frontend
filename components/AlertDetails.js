import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/AlertDetails.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Spin } from 'antd';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';

function AlertDetails() {

    const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
    const router = useRouter()

    const [alert, setAlert] = useState({});
    const [messages, setMessages] = useState([]);
    const [reactions, setReactions] = useState([])


    const alert_id = router.query.alert_id


    // Fetch de l'alerte et des messages liées à cette alerte à partir de l'alert id en query

    useEffect(() => {

        if (alert_id) {
            fetch(`${NEXT_PUBLIC_BACKEND_URL}/alerts/${alert_id}`)
                .then(response => response.json())
                .then(apiData => {
                    setAlert(apiData.alert)
                })

            const fetchMessages = async () => {
                const messagesResponse = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/messages/alert/${alert_id}`)
                const messagesData = await messagesResponse.json()
                setMessages(messagesData.messages)

            }

            fetchMessages()
        }
    }, [alert_id])


    // Fetch des reactions par messages (boulce dans le use effect)

    useEffect(() => {

        if (messages.length > 0) {

            const fetchReactions = async () => {
                let reactionsArray = []
                for (let element of messages) {
                    const reactionsResponse = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/messages/reactions/${element._id}`)
                    const reactionsData = await reactionsResponse.json()
                    setReactions(prevReactions => [...prevReactions, reactionsData])

                }
            }

            fetchReactions()
        }
    }, [messages])

    // Génération du tableau de message

    let listLogs = messages.slice(0, 10).map((log, i) => {

        let infosDisplay = <Spin />;
        let statusDisplay = '';

        // Affichage conditionel statut

        if (log.google_response_status === 200) {
            statusDisplay =  <FontAwesomeIcon icon={faCircleCheck} color='green' size='xl' />

        } else {
            statusDisplay = <FontAwesomeIcon icon={faCircleXmark} color='red' size='xl' /> 

        }

        let messageReaction = reactions?.find(e => e.message_id === log._id)
        let emojis = messageReaction?.emojis
        let emojisArray = []


        // Affichage conditionnel des réactions

        if (messageReaction) {
            if (messageReaction.reactions > 0 && log.google_response_status === 200) {
                for (const [emoji, count] of Object.entries(emojis)) {
                    emojisArray.push(<p key={emoji}>{`${emoji} ${count}`}</p>)
                }
                infosDisplay = <span className={styles.reactions}> <p className={styles.reactionLabel}>Reactions: </p> <span className={styles.emojis}>{emojisArray}</span></span> 
            } else if (messageReaction.reactions === 0 && log.google_response_status === 200) {
                infosDisplay = 'No reactions yet'
            } else if (log.google_response_status !== 200) {
                infosDisplay = 'A problem occured while sending your message, please contact support team'
            }
        }


        return (
            <div key={i} className={styles.logsItem} >
                <div className={styles.logsSubItem}><span>{moment(log.creation_date).format('MMMM Do YYYY, h:mm:ss a')}</span></div>
                <div className={styles.logsSubItem}><span>{log.message_text}</span></div>
                <div className={styles.logsSubItem}><span>{statusDisplay}</span></div>
                <div className={styles.logsSubItem}><span className={styles.reactions}>{infosDisplay}</span></div>
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
                    <div className={styles.infosSubBox}><p className={styles.infoBoxKeyname}>Last Updated on :</p><p>{alert.last_update_date ? moment(alert.last_update_date).format('MMMM Do YYYY, h:mm:ss a') : ''}</p></div>
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
                    <h2> Last Messages Details: </h2>
                    <p>Total messages count: {messages.length}</p>
                </div>

                <div className={styles.logsListTitle}>
                    <div className={styles.logsSubItem}><p>SENT DATE</p></div>
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