import { Chart as ChartJS } from "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { useRef } from "react";
import { useSelector } from 'react-redux';
import styles from '../styles/Chart.module.css'


function Chart(props) {
    const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

    const chartRef = useRef(null);
    const user = useSelector((state) => state.user.value)
    const [base64Image, setBase64Image] = useState(null)
    const [channelId, setChannelId] = useState('')
    const [channelsList, setChannelsList] = useState('')

    const backgroundColorTab = [
        "#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF",
        "#FF9F40", "#C9CBCF", "#FF6384", "#36A2EB", "#FFCE56",
        "#2D8647", "#50AF95", "#f3ba2f", "#2a71d0", "#EC932F",
        "#3498db", "#e74c3c", "#1abc9c", "#9b59b6", "#34495e",
        "#f39c12", "#d35400", "#16a085", "#27ae60", "#8e44ad"
    ];

    let labelTitle = 'time'
    if(props.chartType === "Pie"){
        labelTitle = 'title'
    }

    // Construction de l'objet attendu par le chart
    const messagesData = {
        labels: props.chartData.map((data) => data[labelTitle]),
        datasets: [
            {
                label: props.label,
                data: props.chartData.map((data) => data.value),
                backgroundColor: backgroundColorTab.slice(0, props.chartData.length),
                borderColor: "grey",
                borderWidth: 2,
            },
        ],
    };

    
    const sendImage = () => {
        const chart = chartRef.current;
        setBase64Image(chart.toBase64Image())
    };


    // Récupère la liste des channels du user
    useEffect(() => {
        (async () => {
            const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/users/channels/${user.pipedrive_company_id}/${user.pipedrive_user_id}`)
            const data = await response.json()
            
            setChannelsList(data.channels)
            setChannelId(data.channels[0].name.slice(7))
        })()
    },[])

    
    useEffect(() => {
        if(base64Image){
            fetch(`${NEXT_PUBLIC_BACKEND_URL}/dashboard/sendChart`, {
                method: 'POST',
                body: JSON.stringify({
                    pipedrive_company_id: user.pipedrive_company_id, 
                    pipedrive_user_id: user.pipedrive_user_id, 
                    google_channel_id: channelId, 
                    dashboard_name: props.chartTitle, 
                    picture: base64Image
                }),
                headers: { 'Content-Type': 'application/json' },
            }).then((response) => response.json())
            .then((data) => {
                console.log(data)
            });
        }
    }, [base64Image])


    // Création de la liste déroulante pour les channels
    let channelsData = []
    if(channelsList){
        channelsData = channelsList.map((channel, i) => <option key={i} value={channel.name.slice(7)}>{channel.displayName}</option>)
    }

    
    if(props.chartType === 'Bar') {
        
    return (
        <div className={styles.container}> 
            <h2>{props.chartTitle}</h2>
            <Bar ref={chartRef} data={messagesData} type={props.chartType} /> 
            {props.send && 
                <div className={styles.sendGraph}>
                    <span>Channel : </span>
                    <select value={channelId} onChange={(e) => setChannelId(e.target.value)}>
                        {channelsData}
                    </select>
                    <button className="btn bgGreen" onClick={() => sendImage()}>Envoyer le graphique</button>
                </div>
            }
        </div>
    );
    
    }

    if(props.chartType === 'Pie') {
        return <> <h2>{props.chartTitle}</h2><Doughnut data={messagesData} type={props.chartType} /> </>;
        
    }
}

export default Chart;