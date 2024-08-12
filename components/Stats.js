import styles from '../styles/Stats.module.css'
import DateFilters from './DateFilters';


function Stats() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Usage statistics</h1>
                <span>Visualize statistics about your usage of the app</span>
            </div>
            
            <DateFilters/>
                        
            <div>
                {/* La liste des composants charts */}
            </div>

        </div>
    )
}

export default Stats;