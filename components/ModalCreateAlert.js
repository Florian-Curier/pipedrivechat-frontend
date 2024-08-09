import styles from '../styles/ModalCreateAlert.module.css';
import { Modal } from 'antd';
import { useState, useEffect } from 'react';
import AlertInfosConfig from './AlertInfosConfig';
import AlertMessageConfig from './AlertMessageConfig'
import { useDispatch, useSelector } from 'react-redux';
import { addAlertInStore, updateAlertInStore } from '../reducers/alerts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

function ModalCreateAlert(props) {
    const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
    console.log("props modal: ", props)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value);

    const [modalVisible, setModalVisible] = useState(false)
    const [newAlert, setNewAlert] = useState({alert_name: '', trigger_id: {}, google_channel_id: '', google_channel_name: ''})
    const modalUpdate = props.type === "update" ? true : false
    
    useEffect(() => {
        console.log("props modal useEffect: ", props)
        if(modalUpdate){
            setNewAlert(props.alert)
        }
    }, [modalVisible])
    
    // Variable permettant de gérer l'état d'avancement de la création d'une alerte
    const [stage, setStage] = useState(1)
    
    // Fonction permettant de récupérer les données de la nouvelle alerte renseignées par l'utilsiateur dans les sous composants
    const updateNewAlert = (newInfoAlert) => {
        setNewAlert({...newAlert, ...newInfoAlert});
        setStage(stage + 1)
    };

    // Fonction permettant de rendre visible ou non la modal. Utilisée pour la croix de la modal et le bouton cancel
    const handleVisibleModal = (etat) => {
        setModalVisible(etat)
    }

    // Change la couleur des checkpoints selon l'état d'avancement
    let colorStage = 'bgGray'
    if(stage === 2){
        colorStage = 'bgGreen'
    }

    // Enregistre la nouvelle alerte lorsque les étapes de la modale sont terminées
    useEffect(() => {
        if(stage === 3){            
            if(modalUpdate){
                let updateAlert = { 
                    alert_id: newAlert._id,
                    alert_name: newAlert.alert_name, 
                    google_channel_id: newAlert.google_channel_id, 
                    google_channel_name: newAlert.google_channel_name, 
                    trigger_id: newAlert.trigger_id._id, 
                    trigger_name: newAlert.trigger_id.trigger_name, 
                    message: newAlert.message, 
                    pipedrive_user_id: user.pipedrive_user_id, 
                    pipedrive_company_id: user.pipedrive_company_id,
                }

                fetch(`${NEXT_PUBLIC_BACKEND_URL}/alerts`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updateAlert),
                }).then(response => response.json()).then(data => {
                    if(data.result){
                        dispatch(updateAlertInStore(newAlert))
                        setNewAlert({alert_name: '', trigger_id: '', google_channel_id: ''})
                        setStage(1)
                        handleVisibleModal(false)
                    } else {
                        console.log(data.error)
                    }
                })
            } else {
                let createAlert = { 
                    alert_name: newAlert.alert_name, 
                    google_channel_id: newAlert.google_channel_id, 
                    google_channel_name: newAlert.google_channel_name, 
                    trigger_id: newAlert.trigger_id._id, 
                    trigger_name: newAlert.trigger_id.trigger_name, 
                    message: newAlert.message, 
                    pipedrive_user_id: user.pipedrive_user_id, 
                    pipedrive_company_id: user.pipedrive_company_id,
                }

                fetch(`${NEXT_PUBLIC_BACKEND_URL}/alerts`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(createAlert),
                }).then(response => response.json()).then(data => {
                    if(data.result){
                        dispatch(addAlertInStore(data.newAlert))
                        setNewAlert({alert_name: '', trigger_id: '', google_channel_id: ''})
                        setStage(1)
                        handleVisibleModal(false)
                    } else {
                        console.log(data.error)
                    }
                })
            }
        }
    }, [stage])

    return (<>
        <Modal title={modalUpdate ? "Update alert" : "Create new alert"} onCancel={() => handleVisibleModal(false)} visible={modalVisible} footer={null} >
            {stage === 1 && <AlertInfosConfig key={props.id ? props.id: ''} updateNewAlert={updateNewAlert} handleVisibleModal={handleVisibleModal} newAlert={newAlert} />}
            
            {stage === 2 && <AlertMessageConfig key={props.id ? props.id: ''} updateNewAlert={updateNewAlert} handleVisibleModal={handleVisibleModal} newAlert={newAlert} />}

                <div className={styles.checkpoint}>
                    <div className={`${styles.barre} bgGreen`}></div>
                    <div onClick={() => setStage(1)} className={`${styles.point} ${colorStage}`}></div>
                    <div className={`${styles.barre} ${colorStage}`}></div>
                    <div className={`${styles.point} bgGray`}></div>
                </div>
        </Modal>

        {modalUpdate && <FontAwesomeIcon icon={faPen} className={styles.edit} onClick={() => handleVisibleModal(true)} />}
        {!modalUpdate && <button className={styles.newAlert} onClick={() => handleVisibleModal(true)}>+ New Alert </button>}
    </>
    )
}

export default ModalCreateAlert;