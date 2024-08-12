import styles from '../styles/DateFilers.module.css'
import { useState } from 'react';

function DateFilters () {

    const [startDate , setStartDate] = useState('2024-08-09')
    const [endDate , setEndDate] = useState('2024-08-09')
    const [displayType, setDisplayType] = useState('')

    console.log('start' ,startDate ,'end ' ,endDate , 'display ' , displayType)

    return (



        <div className={styles.container}> 

            
            <span className={styles.keyName} >Start Date :</span>
            <input type="date" className={styles.keyValue} value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
            <span className={styles.keyName}>End Date :</span>
            <input type="date" className={styles.keyValue} value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
          
            <span className={styles.keyName}> Display Type :</span>
            <select className={styles.keyValue} onChange={(e) => setDisplayType(e.target.value)}>
                <option value="Day">Day</option>
                <option value="Week">Week</option>
                <option value="Month">Month</option>
                <option value="Quarter">Quarter</option>
                <option value="Year">Year</option>
            </select>



        </div>
          
        

    )
}

export default DateFilters;