import styles from '../styles/Business.module.css'
import { useState, useEffect } from "react";
import Chart from './Chart';
import { useSelector } from 'react-redux';

function Business() {
  const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
  const user = useSelector((state) => state.user.value)

  const [leaderboard, setLeaderboard] = useState(0)

  const [startDateFilter, setStartDateFilter] = useState('null')
  const [endDateFilter, setEndDateFilter] = useState('null')
  const [displayType, setDisplayType] = useState('Year')

  const pipedriveCompanyId = 13476443;
  const pipedriveUserId = 21669270;
  const [dealData, setDealData] = useState([]);
  
  

  useEffect(() => {
    const startDate = new Date(startDateFilter);
    const endDate = new Date(endDateFilter);
    const timeUnit = displayType;

    const fetchDealsData = async () => {
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/dashboard/turnover/${pipedriveCompanyId}/${pipedriveUserId}/${startDate}/${endDate}/${timeUnit}`);
      const routeDealsData = await response.json();

      setDealData([...routeDealsData.deals]);
    }
    fetchDealsData()

      .catch(console.error);
  }, [startDateFilter, endDateFilter, displayType])


  useEffect(() => {
    (async () => {
      const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/dashboard/leaderboard/${user.pipedrive_company_id}/${user.pipedrive_user_id}/${startDateFilter}/${endDateFilter}`);
      const data = await response.json();
      console.log(data)
      setLeaderboard(data.deals)
    })()
  }, [startDateFilter, endDateFilter])


  let filteredDealData = dealData.map((data) => {
    data.time = data.won_time
    return data
  })

  console.log("leaderboard :", leaderboard)
  return (
    <div>
      <div className={styles.containerFilters}>
          <span className={styles.keyName} >Start Date :</span>
          <input type="date" className={styles.keyValue} value={startDateFilter} onChange={(e) => setStartDateFilter(e.target.value)} />
          <span className={styles.keyName}>End Date :</span>
          <input type="date" className={styles.keyValue} value={endDateFilter} onChange={(e) => setEndDateFilter(e.target.value)} />

          <span className={styles.keyName}> Display Type :</span>
          <select value={displayType} className={styles.keyValue} onChange={(e) => setDisplayType(e.target.value)}>
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="quarter">Quarter</option>
              <option value="year">Year</option>
          </select>
      </div>

      <div style={{ width: 700 }}>
        <Chart send={true} chartData={filteredDealData} chartType='Bar' chartTitle='Turnover' />
      </div>

      <div style={{ width: 700 }}>
          {leaderboard.length > 0 && <Chart send={true} chartData={leaderboard} chartType='Bar' chartTitle='Leaderboard' /> || <span>Pas de données pour le Leaderboard avec les dates sélectionnées</span>}
      </div>
    </div>
  );
}

export default Business;
