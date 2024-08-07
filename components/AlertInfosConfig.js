import { useEffect, useState } from 'react';
import styles from '../styles/AlertInfosConfig.module.css'
import { useSelector } from 'react-redux';

function AlertInfosConfig(props) {

    const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

    const user = useSelector((state) => state.user.value);

    const [alertName, setAlertName] = useState(props.newAlert.alert_name)
    const [trigger, setTrigger] = useState(props.newAlert.trigger_id)
    const [channel, setChannel] = useState(props.newAlert.google_channel_id)

    const [triggersList, setTriggersList] = useState([])
    const [channelsList , setChannelsList] = useState([])


    // Fetch des triggers

    useEffect(() => {
        const fetchTriggers = async () => {
    
        const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/triggers`)
        const data = await response.json()
        setTriggersList(data.triggers)

        }

        fetchTriggers()
    },[])


    // Fetch des channels du user

    useEffect(() => {
        const fetchChannels = async () => {
        const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/users/channels/${user.pipedrive_company_id}/${user.pipedrive_user_id}`)
        const data = await response.json()
        setChannelsList(data.channels)
        }

        fetchChannels()

    },[])


    // Fonction permettant de transmettre au composant parent les infos saisies par l'utilisateur

    const nextStage = () => {

        let triggerData = triggersList.filter(e => e._id === trigger)
        let channelData = channelsList.filter(e => e.name === channel)
        let newAlert = {alert_name: alertName, trigger: triggerData[0] ,  google_channel_id: channelData[0].name.slice(7) , google_channel_name:channelData[0].displayName}
        console.log( 'new alert : ', newAlert)
        //props.updateNewAlert(newAlert)
    }

    // Fonction permettant de fermer la modal

    const cancelStage = () => {
        props.handleVisibleModal(false)
    }

    // Boucle sur les triggers fetchés pour créer la liste déroulante

    let triggerSelectOptions = []

    for (let element of triggersList){
     triggerSelectOptions.push(<option  value={element._id}>{element.trigger_name}</option>)   
    }

    // Boucle sur les channels fetchés pour créer la liste déroulante

    let channelSelectOptions = []

    for (let element of channelsList){
        channelSelectOptions.push(<option value={element.name}>{element.displayName}</option>)   
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
                {channelSelectOptions}
   
            </select>
            
            <div className={styles.footer}>
                <button className="btn bgRed" onClick={() => cancelStage()}>Cancel</button>
                <button className="btn bgGreen" onClick={() => nextStage()}>Next</button>
            </div>
        </div>
    )
}

export default AlertInfosConfig;