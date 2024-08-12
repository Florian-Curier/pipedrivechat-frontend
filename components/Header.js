import { useEffect, useState } from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import { Popover, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";

function Header() {
  const userEmail = useSelector((state) => state.user.value.google_email);//accéder à l'adresse mail de l'utilisateur stocké dans l'état global de redux

  const popoverContent = (
    //affichage de l'adresse mail de l'utilisateur
    <div className={styles.popoverContent}>
      <p>{userEmail}</p>
    </div>
  );

  const router = useRouter();

  const path = router.pathname;

  useEffect(() => {}, [router]);

  return (
    <header className={styles.container}>
      <Link href="/alerts">
        <span
          className={`${styles.link} ${
            path === "/alerts" ? styles.active : ""
          }`}
        >
          Alerts
        </span>
      </Link>
      <Link href="/dashboard">
        <span
          className={`${styles.link} ${
            path === "/dashboard" ? styles.active : ""
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
      <Popover
        className={styles.popover}
        content={popoverContent}
        title="Adresse-mail"
      >
        <Button shape="round">
          <FontAwesomeIcon icon={faUser} />
        </Button>
      </Popover>
    </header>
  );
}

export default Header;
