import React from "react";
import Link from "next/link";

import styles from "./Head.module.scss";

const Head = () => {
    return (
        <div className={styles.container}>
            <Link className={styles.myAccount_link} href={"/myAccount"}>
                my account
            </Link>
        </div>
    );
};

export default Head;
