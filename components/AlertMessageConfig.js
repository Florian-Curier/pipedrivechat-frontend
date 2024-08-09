import styles from "../styles/AlertMessageConfig.module.css";
import { useState, useRef } from "react";

function AlertMessageConfig(props) {
  const [message, setMessage] = useState(props.newAlert.trigger_id.default_message);
  const [label, setLabel] = useState("");
  const [isToggleOn, setIsToggleOn] = useState(true);

  const defaultMessage = props.newAlert.trigger_id.default_message
  const textareaRef = useRef(null);
  //const editableDivRef = useRef(null);

  // const handleMessageChange = (e) => {
  //   setMessage(e.target.innerText);
  // };

  const handleToggleChange = () => {
    setIsToggleOn(!isToggleOn);

    if(!isToggleOn){
      console.log(defaultMessage)
      setMessage('')
      setMessage(defaultMessage)
    }
    // if (editableDivRef.current) {
    //   editableDivRef.current.innerText = toggleMessage;
    // }
  };

  const cancelStage = () => {
    props.handleVisibleModal(false);
  };

  const nextStage = () => {
    let newAlert = { message: message };
    props.updateNewAlert(newAlert);
  };

  const insertLabelMessage = () => {
    let insertLabel = `#${label}`
    let cursorPosition = textareaRef.current.selectionStart
    let textBeforeCursorPosition = message.substring(0, cursorPosition)
    let textAfterCursorPosition = message.substring(cursorPosition, message.length)
    let result = textBeforeCursorPosition + insertLabel + textAfterCursorPosition
    console.log(textareaRef)
    console.log(cursorPosition)
    setMessage(result)

  }

  let labelOptions = props.newAlert.trigger_id.labels.map((element, i) => <option key={i} value={element}>{element}</option>)

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
          >
          </textarea>

          <div className={styles.dataDeal}>
            <label className={styles.dataDealLabel}>Insert data deal</label>
            <div className={styles.dataDealInputs}>
              <select disabled={isToggleOn ? true : false} onChange={(e) => setLabel(e.target.value)}>
                <option value="">Choose a label</option>
                {labelOptions}
              </select>
              <button disabled={isToggleOn ? true : false} className={styles.buttonInsert} onClick={() => insertLabelMessage()}>Insert</button>
            </div>
          </div>

        </div>

        <div className={styles.detailsSection}>
          <label className={styles.detailsLabel}>Details</label>
          <div className={styles.detailsValue}>
            <p>{label}</p>
            {label !== "" && <div><p>____________________</p>
            <p>________________________________________</p>
            <p>____________________</p></div>}
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
        <button className="btn bgRed" onClick={() => cancelStage()}>
          Cancel
        </button>
        <button className="btn bgGreen" onClick={() => nextStage()}>
          Finish
        </button>
      </div>
    </div>
  );
}

export default AlertMessageConfig;
