import styles from '../styles/Business.module.css'
import { useState, useEffect } from "react";
import Chart from './Chart';
import { useSelector } from 'react-redux';

function Business() {
  const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
  const user = useSelector((state) => state.user.value)

  const [leaderboard, setLeaderboard] = useState(0)

  const [startDate, setStartDate] = useState('null')
  const [endDate, setEndDate] = useState('null')
  const [displayType, setDisplayType] = useState('day')

  const [dealData, setDealData] = useState([]);


  // Use effet pour assigner une valeur au date si jamais elles sont vidées
  useEffect(() => {

      }, [startDate, endDate])




  useEffect(() => {

    (async () => {

      if (!startDate) {
        setStartDate('null')
      }

      if (!endDate) {
        setEndDate('null')
      }
      if (startDate && endDate){
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/dashboard/turnover/${user.pipedrive_company_id}/${user.pipedrive_user_id}/${startDate}/${endDate}/${displayType}`);
      const routeDealsData = await response.json();
      setDealData([...routeDealsData.deals]);
      }
      

    })()

  }, [startDate, endDate, displayType])




  useEffect(() => {
    (async () => {

      if (!startDate) {
        setStartDate('null')
      }

      if (!endDate) {
        setEndDate('null')
      }


      if (startDate && endDate){
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/dashboard/leaderboard/${user.pipedrive_company_id}/${user.pipedrive_user_id}/${startDate}/${endDate}`);
      const data = await response.json();
      console.log(data)
      setLeaderboard(data.deals)
    }
    })()
  }, [startDate, endDate])


  let filteredDealData = dealData.map((data) => {
    data.time = data.won_time
    return data
  })

  return (
    <div>

      <div className={styles.header}>
        <h1>Business Dashboard</h1>
        <span>Visualize and share data from your Pipedrive</span>
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
      <div className={styles.graphContainer}>
        <div style={{ width: 700 }}>
          <Chart send={true} chartData={filteredDealData} chartType='Bar' chartTitle='Turnover' />
        </div>

        <div style={{ width: 700 }}>
          {leaderboard.length > 0 && <Chart send={true} chartData={leaderboard} chartType='Bar' chartTitle='Leaderboard' /> || <span>Pas de données pour le Leaderboard avec les dates sélectionnées</span>}
        </div>
      </div>
    </div>
  );
}

export default Business;
