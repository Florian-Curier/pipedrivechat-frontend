import { useEffect, useState } from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import { Popover, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { clearGoogleEmailInStore } from "../reducers/user";


function Header() {


  const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.value)
  const router = useRouter();
  const path = router.pathname;

  if (!user.google_email || !user.pipedrive_user_id) {
    router.push('/')
  }


  // Gestion du logout google : fetch backend et mise à jour reducer

  const handleGoogleLogout = () => {

    fetch(`${NEXT_PUBLIC_BACKEND_URL}/users/googleLogout`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ pipedrive_company_id: user.pipedrive_company_id, pipedrive_user_id: user.pipedrive_user_id })
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(clearGoogleEmailInStore())
          router.push('/')
        }
      })
  }

  // Contenu de la popover user

  const popoverContent = (
    <div className={styles.popoverContent}>
      <p> {user.google_email}</p>
      <span className={styles.info}>
        <FontAwesomeIcon icon={faCircleQuestion} className={styles.question} /> <p> Logout to use another Google account</p>
      </span>
      <button className="btn bgRed" onClick={() => handleGoogleLogout()}> Logout</button>
    </div>
  );

  return (
    <header className={styles.container}>

      <Image  src='/pipedriveChatLogo.png' alt = 'Logo'  width={219} height={77} className={styles.logo}/>


      <div className={styles.menuContainer}>

      <Link href="/alerts">
        <span
          className={`${styles.link} ${path === "/alerts" ? styles.active : ""
            }`}
        >
          Alerts
        </span>
      </Link>
      <Link href="/dashboard">
        <span
          className={`${styles.link} ${path === "/dashboard" ? styles.active : ""
            }`}
        >
          Dashboard Buisness
        </span>
      </Link>
      <Link href="/stats">
        <span
          className={`${styles.link} ${path === "/stats" ? styles.active : ""}`}
        >
          Usage statistics
        </span>
      </Link>

      </div>

      <Popover
        className={styles.popover}
        title="Google Account"
        content={popoverContent}>
        <Button shape="round">
          <FontAwesomeIcon icon={faUser} />
        </Button>
      </Popover>


    </header>
  );
}

export default Header;
