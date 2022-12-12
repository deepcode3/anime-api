import React from "react";
import styles from "./myAccount.module.scss";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useContext } from "react";
import AppContext from "../AppContext";

const Profile = () => {
    const value = useContext(AppContext);
    const { userSelected } = value.state;
    console.log("userSelected", userSelected);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const handleNameChange = (data, e) => {
        console.log(data);
        value.setUserSelected({
            name: data.name,
            email: userSelected.email,
            age: userSelected.age,
        });
        e.target.reset();
    };

    return (
        <div className={styles.container}>
            {userSelected.name ? (
                <>
                    <div className={styles.textBox}>
                        <h3>My Account</h3>
                        <span>Name:{userSelected.name}</span>
                        <span>Email:{userSelected.email}</span>
                        <span>Age:{userSelected.age}</span>
                    </div>
                    <form onSubmit={handleSubmit(handleNameChange)}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>User Name</label>
                            <input
                                className={clsx(
                                    styles.formField,
                                    errors.name && styles.formFieldError
                                )}
                                type="text"
                                {...register("name", { required: true })}
                            />
                            {errors?.name?.type === "required" && (
                                <p className={styles.formFieldErrorMessage}>Field is required</p>
                            )}
                        </div>
                        <button type="submit" className={styles.formSubmitBtn}>
                            Change
                        </button>
                    </form>
                </>
            ) : (
                <p>No data found</p>
            )}
        </div>
    );
};

export default Profile;
