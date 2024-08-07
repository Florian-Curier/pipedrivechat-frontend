import styles from "../styles/AlertMessageConfig.module.css";
import { useState, useRef } from "react";

function AlertMessageConfig(props) {
  const [message, setMessage] = useState("");
  const [value, setValue] = useState("");
  const [isToggleOn, setIsToggleOn] = useState(false);
  const editableDivRef = useRef(null);

  const handleMessageChange = (e) => {
    setMessage(e.target.innerText);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleToggleChange = () => {
    const newToggleState = !isToggleOn;
    setIsToggleOn(newToggleState);
    const toggleMessage = newToggleState ? "Toggle is on" : "";
    setMessage(toggleMessage);
    if (editableDivRef.current) {
      editableDivRef.current.innerText = toggleMessage;
    }
  };

  const cancelStage = () => {
    props.handleVisibleModal(false);
  };

  const nextStage = () => {
    let newAlert = { alert_name: message, trigger_id: value };
    props.updateNewAlert(newAlert);
  };

  return (
    <div className={styles.container}>
      <div className={styles.editableDiv}>
        <div className={styles.messageSection}>
          <label className={styles.messageLabel}>* Message to send</label>
          <div
            className={styles.messageInput}
            contentEditable= {!isToggleOn}
            onChange={(e) => setMessage(e.target.value)}
          >
            {message}
          </div>
          <div className={styles.dataDeal}>
            <label className={styles.dataDealLabel}>Insert data deal</label>
            <div className={styles.dataDealInputs}>
              <select value={value} onChange={handleValueChange}>
                <option value="">Value</option>
              
              </select>
              <button className={styles.buttonInsert}>Insert</button>
            </div>
          </div>
        </div>
        <div className={styles.detailsSection}>
          <label className={styles.detailsLabel}>Details</label>
          <div className={styles.detailsValue}>
            <p>Value</p>
            <p>____________________</p>
            <p>____________________</p>
            <p>____________________</p>
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
