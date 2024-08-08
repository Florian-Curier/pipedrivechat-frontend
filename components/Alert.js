import styles from '../styles/Alert.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { deleteAlertInStore } from '../reducers/alerts'
import { useDispatch } from 'react-redux';

function Alert(props) {
    const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
    const dispatch = useDispatch()

    const handleClickAlertDetails = () => {
        console.log('click see alert details')
    }

    const handleClickEditAlert = () => {
        console.log('click edit alert ')
    }



    const handleClickDeleteAlert = () => {
        fetch(`${NEXT_PUBLIC_BACKEND_URL}/alerts/${props.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => response.json()).then(data => {
            if(data.result){
                dispatch(deleteAlertInStore(props.id))
            } else {
                console.log(data)
            }
        })
    }


    return (

        <div className={styles.alertContainer} >
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