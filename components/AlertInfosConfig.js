import { useEffect, useState } from 'react';
import styles from '../styles/AlertInfosConfig.module.css'
import { useSelector } from 'react-redux';

function AlertInfosConfig(props) {
    const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
    console.log("props alerInfo trigger : ", props.newAlert.trigger_id._id)
    const user = useSelector((state) => state.user.value);

    const [alertName, setAlertName] = useState('')
    const [trigger, setTrigger] = useState('')
    const [channel, setChannel] = useState('')
    const [notValidate, setNotValidate] = useState(false)

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
        
        //Modification à faire dans le backend => enlever le 'spaces/'
        let listChannels = data.channels.map(element => {
            element.name = element.name.slice(7)
            return element
        })
        console.log(listChannels)
        setChannelsList(listChannels)
        }
        fetchChannels()
    },[])

    // Si Modification d'une alerte, nous chargons ses données
    useEffect(() => {
        if(props.newAlert.alert_name !== ""){
            setAlertName(props.newAlert.alert_name)
            setTrigger(props.newAlert.trigger_id._id)
            setChannel(props.newAlert.google_channel_id)
        }
    },[])

    // Fonction permettant de transmettre au composant parent les infos saisies par l'utilisateur
    const nextStage = () => {
        if(alertName !== '' && channel !== '' && trigger !== ''){
            let triggerData = triggersList.filter(e => e._id === trigger)
            let channelData = channelsList.filter(e => e.name === channel)
            
            console.log(channelsList)
            console.log(channel)
            console.log(channelData)
            let newAlert = {alert_name: alertName, trigger_id: triggerData[0] ,google_channel_id: channelData[0].name , google_channel_name:channelData[0].displayName}

            // Invers Data Flow pour transmettre les informations de la nouvelle alerte
            props.updateNewAlert(newAlert)
        } else {
            setNotValidate(true)
        }
    }

    // Fonction permettant de fermer la modal
    const cancelStage = () => {
        props.handleVisibleModal(false)
        
        if(props.newAlert.alert_name !== ""){
            setAlertName(props.newAlert.alert_name)
            setTrigger(props.newAlert.trigger_id._id)
            setChannel(props.newAlert.google_channel_id)
        } else {
            setAlertName('')
            setTrigger('')
            setChannel('')
        }
        setNotValidate(false)
    }

    // Boucle sur les triggers fetchés pour créer la liste déroulante
    let triggerSelectOptions = triggersList.map((element, i) => <option selected={element._id === trigger ? 'selected' : '' } key={i} value={element._id}>{element.trigger_name}</option>)

    // for (let element of triggersList){
    //  triggerSelectOptions.push(<option  value={element._id}>{element.trigger_name}</option>)   
    // }
    
    // Boucle sur les channels fetchés pour créer la liste déroulante
    let channelSelectOptions = channelsList.map((element, i) => <option selected={element.name === channel ? 'selected' : '' } key={i} value={element.name}>{element.displayName}</option>)

    // for (let element of channelsList){
    //     channelSelectOptions.push(<option value={element.name}>{element.displayName}</option>)   
    // }
    console.log("alerInfo : ", alertName)
    return (
        <div className={styles.container} >
            <input maxLength={100} className={styles.alertName} value={alertName} onChange={(e) => setAlertName(e.target.value)} placeholder='Alert name' />
            <p className={styles.alertNameCount}>{alertName.length}/100</p>{notValidate && alertName === '' && <span className={styles.required}>{'Alert name is required'}</span>}

            <select disabled={props.newAlert.alert_name !== '' ? true : false} className={styles.trigger} onChange={(e) => setTrigger(e.target.value)}>
                <option value="">Choose a trigger</option>
                {triggerSelectOptions}
          
            </select>
            {notValidate && trigger === '' && <span className={styles.required}>{'Trigger is required'}</span>}

            <select className={styles.channel} onChange={(e) => setChannel(e.target.value)}>
                <option value="">Choose an channel</option>
                {channelSelectOptions}
   
            </select>
            {notValidate && channel === '' && <span className={styles.required}>{'Channel is required'}</span>}

            <div className={styles.footer}>
                <button className="btn bgRed" onClick={() => cancelStage()}>Cancel</button>
                <button className="btn bgGreen" onClick={() => nextStage()}>Next</button>
            </div>
        </div>
    )
}

export default AlertInfosConfig;