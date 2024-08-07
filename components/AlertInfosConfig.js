import { useEffect, useState } from 'react';
import styles from '../styles/AlertInfosConfig.module.css'
import { useSelector } from 'react-redux';

function AlertInfosConfig(props) {

    const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

    const user = useSelector((state) => state.user.value);

    const [alertName, setAlertName] = useState(props.newAlert.alert_name)
    const [trigger, setTrigger] = useState(props.newAlert.trigger_id)
    const [channel, setChannel] = useState(props.newAlert.google_channel_id)

    const [triggersList, setTriggersList] = useState()
    const [channelsList , setChannelsList] = useState()


    // Fetch des triggers

    useEffect(() => {
        const fetchTriggers = async () => {
    
        const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/triggers`)
        const data = await response.json()
        setTriggersList(data.triggers)

        }

        fetchTriggers()
    },[])

    console.log('triggers : ' , triggersList)

    // Fetch des channels du user

    useEffect(() => {
        const fetchChannels = async () => {
    
        const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/users/channels/${user.pipedrive_company_id}/${user.pipedrive_user_id}`)
        const data = await response.json()
        setChannelsList(data.channels)
        }

        fetchChannels()

    },[])


    console.log('channels : ' , channelsList)

    // Fonction permettant de transmettre au composant parent les infos saisies par l'utilisateur
    const nextStage = () => {
        let newAlert = {alert_name: alertName, trigger_id: trigger, google_channel_id: channel}
        props.updateNewAlert(newAlert)
    }

    // Fonction permettant de fermer la modal
    const cancelStage = () => {
        props.handleVisibleModal(false)
    }

    let triggerSelectOptions = []

    for (let element of triggersList){

        <option value="newDeal">New deal</option>
    }
    
   
  



    return (
        <div className={styles.container} >
            <input maxLength={100} className={styles.alertName} value={alertName} onChange={(e) => setAlertName(e.target.value)} placeholder='Alert name' />
            <p className={styles.alertNameCount}>{alertName.length}/100</p>
            <select className={styles.trigger} onChange={(e) => setTrigger(e.target.value)}>
                <option value="">Choose a trigger</option>
                {triggerSelectOptions}
          
            </select>

            <select className={styles.channel} onChange={(e) => setChannel(e.target.value)}>
                <option value="">Choose an channel</option>
                <option value="channel1">Channel 1</option>
                <option value="channel2">Channel 2</option>
            </select>
            
            <div className={styles.footer}>
                <button className="btn bgRed" onClick={() => cancelStage()}>Cancel</button>
                <button className="btn bgGreen" onClick={() => nextStage()}>Next</button>
            </div>
        </div>
    )
}

export default AlertInfosConfig;