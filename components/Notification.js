import styles from "../styles/Notification.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faXmark,
  faTriangleExclamation,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const notificationTypes = {
    //objet permettant de gérer les différents types de navigations
  validation: {
    icon: faCircleCheck,
    style: styles.notificationValidation,
  },

  warning: {
    icon: faTriangleExclamation,
    style: styles.notificationWarning,
  },

  delete: {
    icon: faCircleXmark,
    style: styles.notificationDelete,
  },
};

function Notification({ type, message }) {
  const [notificationVisible, setNotificationVisible] = useState(true);

  const removeNotification = () => {
    //fonction utilisée pour masquer le composant notification
    setNotificationVisible(false);
  };

  const { icon, style } =
    notificationTypes[type] || notificationTypes.validation;
    //destructuration pour extraire les propriétés icones et styles de l'objet correspondant à type dans notificationTypes
    //si type n'existe pas dans notificationTypes, notificationTypes.validation est utilisée comme valeur par défaut

  return (
    <div>
        {notificationVisible && (
            //composant rendu seulement si notificationVisible est à true
      <div className={`${styles.notification} ${style}`}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={icon} />
        </div>
        <span className={styles.message}>{message}</span>
        <button className={styles.closeButton} onClick={removeNotification}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      )}
    </div>
  );
}

export default Notification;
