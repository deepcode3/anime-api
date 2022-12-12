import React from "react";
import Link from "next/link";

import styles from "./Head.module.scss";
import { useContext } from "react";
import AppContext from "../AppContext";

const Head = () => {
    const value = useContext(AppContext);
    const { userSelected } = value.state;
    console.log("userSelected", userSelected.email);

    return (
        <div className={styles.container}>
            {userSelected.email !== undefined ? (
                <Link className={styles.myAccount_link} href={"/myAccount"}>
                    my account
                </Link>
            ) : (
                <span className={styles.myAccount_link}>Animes</span>
            )}
        </div>
    );
};

export default Head;
