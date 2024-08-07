import styles from '../styles/Alert.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

function Alert(props) {

   
const handleClickAlertDetails = () => {
    console.log('click see alert details')
}

const handleClickEditAlert= () => {
    console.log('click edit alert ')
}



const handleClickDeleteAlert= () => {
    console.log('click delete alert ')
}


    return (

    <div className={styles.alertContainer } >
        <button className={styles.alertName} onClick={() => handleClickAlertDetails()}>{props.name}</button>
        <span className={styles.alertItem}> {props.trigger}</span>
        <span className={styles.alertItem}>#{props.channel}</span>
        <span className={styles.alertIcons}>
            <FontAwesomeIcon icon={faPen} className={styles.edit} onClick={() => handleClickEditAlert()} />  
            <FontAwesomeIcon icon={faTrash} className={styles.delete} onClick={() => handleClickDeleteAlert()} />
            </span>
    </div>
    )


}

export default Alert;