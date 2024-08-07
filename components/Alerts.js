import styles from '../styles/Alerts.module.css'
import AppExtensionsSDK, { Command } from "@pipedrive/app-extensions-sdk";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';


function Alerts() {
    const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
    const user = useSelector((state) => state.user.value);
    const pipedriveCompanyId = user.pipedrive_company_id;
    const pipedriveUserId = user.pipedrive_user_id;
    const [alertsList, setAlertsList] = useState([]);



    useEffect(() => {
        console.log('useeffect is running')
        const initializeSDK = async () => {
            try {
                const sdk = await new AppExtensionsSDK().initialize();

                console.log("sdk = ", sdk);
            } catch (error) {
                console.log("Failed to initialize AppExtensionsSDK:", error);
            }
        };

        initializeSDK();
    }, []);

    useEffect(() => {
        fetch(`${NEXT_PUBLIC_BACKEND_URL}/alerts/${pipedriveCompanyId}/${pipedriveUserId}`)
 .then(response => response.json())
 .then(alertData => {


setAlertsList([...alertData.alert]);
 });

    }, []);

    console.log(alertsList)
    // console.log(alertsList[0].trigger_id[" trigger_name"])

    const data = [
        { name: "Alert 202", trigger: "New deal", channel: "equipesales" },
        { name: "Alert 203", trigger: "Won deal", channel: "general" },
        { name: "Alert 204", trigger: "New deal", channel: "salesteam" },
    ]
    return (

        <div className={styles.container}>
          

                <div className={styles.configcontent}>
                    
                    <div className={styles.configheading}>
                        
                        <h2 className={styles.maintitle}>Configure my alerts</h2>
                        <p className={styles.sectionparagraph}>Create and configure custom alerts that will be sent to
                            Google Chat when specific conditions are met in Pipedrive.</p>
                    </div>
                    <div className={styles.alertstablecontainer}>
                        
                    <table>
    <thead>
      <tr>
        <th className={styles.paddedelements}>NAME</th>
        <th>TRIGGER</th>
        <th>CHANNEL</th>
        <th>ACTION</th>
      </tr>
    </thead>
    <tbody>
      {alertsList.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td className={styles.paddedelements}>{val.alert_name}</td>
                            <td>{val.trigger_id[" trigger_name"]}</td>
                            <td>#{val.google_channel_name}</td>
                            <td><FontAwesomeIcon icon={faPen} className={styles.edit} /><FontAwesomeIcon icon={faTrash} className={styles.delete}/></td>
                        </tr>
                    )
                })}
      <tr>
      <td className={styles.paddedelements}><button>+New Alert</button></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      </tr>
    </tbody>
  </table>

                    </div>
                    <div className={styles.configfooter}>
                        
                        <div className={styles.helpsection}>
                        <p className={styles.helptext}>Need Help</p>
                        <FontAwesomeIcon icon={faCircleQuestion} className={styles.helpicon} />
                        </div>

                    </div>
                </div>
            </div>

    );
}

export default Alerts;