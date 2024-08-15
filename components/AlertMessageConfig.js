import styles from "../styles/AlertMessageConfig.module.css";
import { useState, useRef, useEffect } from "react";

function AlertMessageConfig(props) {
  const [message, setMessage] = useState(props.newAlert.trigger_id.default_message);
  const [label, setLabel] = useState(""); // État pour le label sélectionné
  const [isToggleOn, setIsToggleOn] = useState(true);

  const defaultMessage = props.newAlert.trigger_id.default_message;
  const textareaRef = useRef(null);

  // Objet de descriptions des labels
  const labelDescription = {
    deal_title: "The title of the deal.",
    deal_formatted_value: "The formatted value of the deal.",
    deal_owner_name: "The name of the deal owner.",
    deal_add_time: "The time when the deal was added.",
    deal_org_name: "The name of the organization associated with the deal.",
  };

  // Si modification d'une alerte, nous chargeons ses données
  useEffect(() => {
    if (props.newAlert.message) {
      setMessage(props.newAlert.message);
      setIsToggleOn(false);
    } else {
      setMessage(props.newAlert.trigger_id.default_message);
      setIsToggleOn(true);
    }
  }, []);

  const handleToggleChange = () => {
    setIsToggleOn(!isToggleOn);

    if (!isToggleOn) {
      setMessage(defaultMessage);
    }
  };

  const cancelStage = () => {
    props.handleVisibleModal(false);
  };

  const nextStage = () => {
    let newAlert = { message: message };
    props.updateNewAlert(newAlert);
  };

  const insertLabelMessage = () => {
    let insertLabel = `#${label}#`;
    let cursorPosition = textareaRef.current.selectionStart;
    let textBeforeCursorPosition = message.substring(0, cursorPosition);
    let textAfterCursorPosition = message.substring(cursorPosition, message.length);
    let result = textBeforeCursorPosition + insertLabel + textAfterCursorPosition;
    setMessage(result);
  };

  const handleLabelChange = (e) => {
    setLabel(e.target.value); // Mise à jour de l'état du label sélectionné
  };

  let labelOptions = props.newAlert.trigger_id.labels.map((element, i) => (
    <option key={i} value={element}>{element}</option>
  )); 

  return (
    <div className={styles.container}>
      <div className={styles.editableDiv}>
        <div className={styles.messageSection}>
          <label className={styles.messageLabel}>* Message to send</label>
          <textarea
            ref={textareaRef}
            className={styles.messageInput}
            disabled={isToggleOn}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></textarea>
          
          <div className={styles.dataDealSection}>
            <div className={styles.dataDeal}>
              <label className={styles.dataDealLabel}>Insert data deal</label>
              <select disabled={isToggleOn} onChange={handleLabelChange}>
                <option value="">Choose a label</option>
                {labelOptions}
              </select>
              <button disabled={isToggleOn} className={styles.buttonInsert} onClick={insertLabelMessage}>Insert</button>
            </div>
            <div className={styles.detailsSection}>
              <label className={styles.detailsLabel}>Details</label>
              <div className={styles.detailsValue}>
                <p>{label}</p>
                {/* Affichage de la description associée au label sélectionné */}
                {label !== "" && <p>{labelDescription[label]}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="toggle">
        <label className={styles.messageToggle}>* Use default message</label>
        <label className="switch">
          <input
            type="checkbox"
            checked={isToggleOn}
            onChange={handleToggleChange}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div className={styles.footer}>
        <button className="btn bgRed" onClick={cancelStage}>
          Cancel
        </button>
        <button className="btn bgGreen" onClick={nextStage}>
          Finish
        </button>
      </div>
    </div>
  );
}

export default AlertMessageConfig;
