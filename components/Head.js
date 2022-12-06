import React from "react";
import styles from "./Head.module.scss";
import { useContext } from "react";
import AppContext from "../AppContext";

const Head = () => {
    const value = useContext(AppContext);
    let { userSelected } = value.state;
    console.log("userSelected", userSelected);
    return (
        <div className={styles.container}>
            {userSelected.name ? (
                <div className={styles.textBox}>
                    <span>Name:{userSelected.name}</span>
                    <span>Email:{userSelected.email}</span>
                    <span>Age:{userSelected.age}</span>
                </div>
            ) : (
                <p>No data found</p>
            )}
        </div>
    );
};

export default Head;
