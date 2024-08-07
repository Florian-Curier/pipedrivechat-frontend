import styles from '../styles/ModalCreateAlert.module.css';
import { Modal } from 'antd';
import { useState } from 'react';
import AlertInfosConfig from './AlertInfosConfig';
import AlertMessageConfig from './AlertMessageConfig'

function ModalCreateAlert() {
    const [modalVisible, setModalVisible] = useState(false)
    const [newAlert, setNewAlert] = useState({alert_name: '', trigger_id: '', google_channel_id: ''})
    
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
    if(stage === 3){
        fetch(`${NEXT_PUBLIC_BACKEND_URL}/alerts` {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify(newAlert),
        }).then(response => response.json()).then(data => {
            if(data.result){
                setNewAlert({alert_name: '', trigger_id: '', google_channel_id: ''})
                handleVisibleModal(false)
            } else {
                console.log(data.error)
            }
        })
    }

    return (<>
        <Modal title="Create new alert" onCancel={() => handleVisibleModal(false)} visible={modalVisible} footer={null} >
            {stage === 1 && <AlertInfosConfig updateNewAlert={updateNewAlert} handleVisibleModal={handleVisibleModal} newAlert={newAlert} />}
            
            {/* Florian il faut remplacer le composant AlertInfosConfig par le composant que tu vas créer */}
            {stage === 2 && <AlertMessageConfig updateNewAlert={updateNewAlert} handleVisibleModal={handleVisibleModal} newAlert={newAlert} />}

                <div className={styles.checkpoint}>
                    <div className={`${styles.barre} bgGreen`}></div>
                    <div onClick={() => setStage(1)} className={`${styles.point} ${colorStage}`}></div>
                    <div className={`${styles.barre} ${colorStage}`}></div>
                    <div className={`${styles.point} bgGray`}></div>
                </div>
        </Modal>

        <button className={styles.newAlert} onClick={() => handleVisibleModal(true)}>+ New Alert </button></>
    )
}

export default ModalCreateAlert;