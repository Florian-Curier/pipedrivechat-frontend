import styles from '../styles/Stats.module.css'

function Stats() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Usage statistics</h1>
                <p>Visualize statistics about your usage of the app</p>
            </div>
            
            {/* Ici il y aura le composant périod */}

            <div>
                {/* La liste des composants charts */}
            </div>

        </div>
    )
}

export default Stats;