import styles from "../styles/Alert.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteAlertInStore } from "../reducers/alerts";
import { useDispatch } from "react-redux";
import ModalCreateAlert from "./ModalCreateAlert";
import { useRouter } from "next/router";
import { Button, Modal } from "antd";
import "antd/dist/antd.css";
import { useState } from "react";

function Alert(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleClickDeleteAlert(); //suppression de l'alerte lors de la confirmation
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClickAlertDetails = () => {
    router.push(`/alert-details?alert_id=${props.alert._id}`);
  };

  const handleClickDeleteAlert = () => {
    fetch(`${NEXT_PUBLIC_BACKEND_URL}/alerts/${props.alert._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(deleteAlertInStore(props.alert._id));
        } else {
          console.log(data);
        }
      });
  };

  return (
    <div className={styles.alertContainer}>
      <Button
        className={styles.alertName}
        onClick={() => handleClickAlertDetails()}
      >
        {props.alert.alert_name}
      </Button>
      <span className={styles.alertItem}>
        {" "}
        {props.alert.trigger_id.trigger_name}
      </span>
      <span className={styles.alertItem}>
        #{props.alert.google_channel_name}
      </span>
      <span className={styles.alertIcons}>
        <ModalCreateAlert
          key={props.alert._id}
          id={props.alert._id}
          alert={props.alert}
          type="update"
        />
        {/* <FontAwesomeIcon icon={faPen} className={styles.edit} onClick={() => handleClickEditAlert()} /> */}

        <FontAwesomeIcon
          icon={faTrash}
          className={styles.delete}
          onClick={showModal}
        />
      </span>
      {/* Ajout de la modale pour la confirmation de suppression */}
      <Modal
        title="Confirmation de la suppression"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} //désactiver l'agencement des boutons
      >
        <div className="modalParagraph">
          <p>Are you sure you want to delete this alert ?</p>
        </div>
        <div className={styles.modalFooter}>
          <button className="btn bgRed" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn bgGreen" onClick={handleOk}>
            OK
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Alert;
