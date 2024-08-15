import { useEffect, useState } from 'react';
import styles from '../styles/Stats.module.css'
import DateFilters from './DateFilters';
import Chart from './Chart';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';


function Stats() {
    const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
    const user = useSelector((state) => state.user.value)

    const [startDate, setStartDate] = useState('null')
    const [endDate, setEndDate] = useState('null')
    const [displayType, setDisplayType] = useState('week')

    const [allMessages, setAllMessages] = useState(null)

    const [alertId, setAlertId] = useState('')
    const [alertsList, setAlertsList] = useState('')
    const [messagesByAlert, setMessagesByAlert] = useState(null)

    const [channelId, setChannelId] = useState('')
    const [channelsList, setChannelsList] = useState('')
    const [messagesByChannel, setMessagesByChannel] = useState(null)

    const [messagesByAllAlert, setMessagesByAllAlert] = useState(null)
    const [messagesByAllChannel, setMessagesByAllChannel] = useState(null)

    
    // Initialiser et mise à jour du graphique AllMessages en fonction des dates
    useEffect(() => {
        (async () => {
            if(!startDate){
                setStartDate('null')
            }

            if(!endDate){
                setEndDate('null')
            }

            const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/messages/all/${user.pipedrive_company_id}/${user.pipedrive_user_id}/${startDate}/${endDate}/${displayType}`)
            const data = await response.json()
           
            setAllMessages(data.messages)
        })()
    }, [startDate, endDate, displayType])

    // Récupère la liste des alertes de l'utilisateur et initialiser le graphique AllMessagesByAllAlert en fonction des dates en PIE
    useEffect(() => {
        (async () => {
            const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/alerts/${user.pipedrive_company_id}/${user.pipedrive_user_id}`)
            const data = await response.json()
            
            setAlertsList(data.alerts)
            setAlertId(data.alerts[0]._id)

            // Génération du graphique de tous les messages par alerte
            let dataGraph = []
            for(let element of data.alerts){
                const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/messages/alert/${element._id}/null/null/null`)
                const data = await response.json()
                
                if(data.messages.length > 0){
                    dataGraph.push({title: element.alert_name, value: data.messages[0].value})
                }
            }
            setMessagesByAllAlert(dataGraph)
        })()
    }, [])

    // Initialiser et mise à jour du graphique AllMessagesByAlert en fonction des dates
    useEffect(() => {
        (async () => {
            if(!startDate){
                setStartDate('null')
            }

            if(!endDate){
                setEndDate('null')
            }

            if(alertId){
            const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/messages/alert/${alertId}/${startDate}/${endDate}/${displayType}`)
            const data = await response.json()
            
            setMessagesByAlert(data.messages)
            }
        })()
    }, [startDate, endDate, displayType, alertId])


    // Récupère la liste des channels du user
    useEffect(() => {
        (async () => {
            const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/users/channels/${user.pipedrive_company_id}/${user.pipedrive_user_id}`)
            const data = await response.json()
            
            setChannelsList(data.channels)
            setChannelId(data.channels[0].name.slice(7))

            // Génération du graphique de tous les messages par channel
            let dataGraph = []
            for(let element of data.channels){
                const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/messages/channel/${element.name.slice(7)}/null/null/null`)
                const data = await response.json()

                let dataValue = 0
                if(data.messages[0]){
                    dataValue = data.messages[0].value
                }
                if (dataValue > 0){
                dataGraph.push({title: element.displayName, value: dataValue})}
            }
            
            setMessagesByAllChannel(dataGraph)
        })()
    },[])

    // Initialiser et mise à jour du graphique AllMessagesByChannel en fonction des dates
    useEffect(() => {
        (async () => {
            if(!startDate){
                setStartDate('null')
            }

            if(!endDate){
                setEndDate('null')
            }

            if(channelId){
                const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/messages/channel/${channelId}/${startDate}/${endDate}/${displayType}`)
                const data = await response.json()

                setMessagesByChannel(data.messages)
            }
        })()
    }, [startDate, endDate, displayType, channelId])


    // Création de la liste déroulante pour les alertes
    let alertsData = []
    if(alertsList){
        alertsData = alertsList.map((alert, i) => <option key={i} value={alert._id}>{alert.alert_name}</option>)
    }

    // Création de la liste déroulante pour les channels
    let channelsData = []
    if(channelsList){
        channelsData = channelsList.map((channel, i) => <option key={i} value={channel.name.slice(7)}>{channel.displayName}</option>)
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Usage statistics</h1>
                <span>Visualize statistics about your usage of the app</span>
            </div>

            <div className={styles.containerPie}>
                <div className={styles.graphPie}>
                    {!messagesByAllAlert && <Spin/>}
                    {messagesByAllAlert !== null && <Chart send={false} label="Messages" chartData={messagesByAllAlert} chartType='Pie' chartTitle='Messages by alerts' />}
                </div>

                <div className={styles.graphPie}>
                    {!messagesByAllChannel && <Spin/>}
                    {messagesByAllChannel !== null && <Chart send={false} label="Messages" chartData={messagesByAllChannel} chartType='Pie' chartTitle='Messages by channels' />}
                </div>
            </div>

            <div className={styles.containerFilters}>
                <span className={styles.keyName} >Start Date :</span>
                <input type="date" className={styles.keyValue} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <span className={styles.keyName}>End Date :</span>
                <input type="date" className={styles.keyValue} value={endDate} onChange={(e) => setEndDate(e.target.value)} />

                <span className={styles.keyName}> Display Type :</span>
                <select value={displayType} className={styles.keyValue} onChange={(e) => setDisplayType(e.target.value)}>
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                    <option value="quarter">Quarter</option>
                    <option value="year">Year</option>
                </select>
            </div>

            <div className={styles.containerBar}>
                <div>
                    {allMessages !== null && <Chart send={false} label="Messages" chartData={allMessages} chartType='Bar' chartTitle='All messages' />}
                </div>

                <div>
                    <select value={alertId} className={styles.keyValue} onChange={(e) => setAlertId(e.target.value)}>
                        {alertsData}
                    </select>
                    {messagesByAlert !== null && <Chart send={false} label="Messages" chartData={messagesByAlert} chartType='Bar' chartTitle='Messages by alert' />}
                </div>

                <div>
                    <select value={channelId} className={styles.keyValue} onChange={(e) => setChannelId(e.target.value)}>
                        {channelsData}
                    </select>
                    {messagesByChannel !== null && <Chart send={false} label="Messages" chartData={messagesByChannel} chartType='Bar' chartTitle='Messages by channel' />}
                </div>
            </div>
        </div>
    )
}

export default Stats;