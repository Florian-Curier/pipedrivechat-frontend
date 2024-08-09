import React, { useState } from 'react';
import styles from '../styles/ModalHelp.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

function ModalHelp() {
    const [isGuidanceVisible, setIsGuidanceVisible] = useState(false);

    const handleNeedHelpClick = () => {
        setIsGuidanceVisible(true);
    };

    const handleCloseGuidance = () => {
        setIsGuidanceVisible(false);
    };

    return (
        <>
            <div className={styles.configFooter}>
                <div className={styles.helpSection} onClick={handleNeedHelpClick}>
                    <p className={styles.helpText}>Need Help</p>
                    <FontAwesomeIcon icon={faCircleQuestion} className={styles.helpIcon} />
                </div>
            </div>
            {isGuidanceVisible && (
                <div className={styles.guidanceOverlay}>
                    <div className={styles.guidanceWindow}>
                        <div className={styles.guidanceHeader}>
                            <h2>Guidance</h2>
                            <button onClick={handleCloseGuidance} className={styles.closeButton}>Close</button>
                        </div>
                        <div className={styles.guidanceContent}>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem consequatur iusto fuga culpa ex voluptates dignissimos nam temporibus aliquid reprehenderit exercitationem cupiditate maiores sint id placeat blanditiis fugit sed, adipisci quisquam cum molestias eos. Maxime adipisci est labore quibusdam minima. Libero,Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aliquid voluptate accusantium id facere sint Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia totam repellat enim. Maxime culpa, esse, quidem optio nam reiciendis id ullam deserunt quam voluptas alias, ut ipsum eveniet eos? Id?Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam illum dolorum distinctio, odit voluptates voluptas provident soluta reprehenderit? Possimus aspernatur, omnis praesentium quibusdam repudiandae minus saepe eligendi aperiam laborum fugiat quae odit ullam architecto ipsa beatae et modi, dolorum ipsam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis ipsam quos ipsa odio. Enim, animi eligendi. Recusandae commodi, in sit eligendi molestias enim, similique incidunt sapiente, eveniet nemo quidem veniam atque aut! Nemo cum tempore, officiis porro nisi nihil minus reiciendis neque aliquid, perferendis quas! Necessitatibus iure, labore incidunt in impedit molestiae atque nihil, pariatur tempore temporibus hic saepe perferendis.</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalHelp;

