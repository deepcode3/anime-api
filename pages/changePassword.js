import styles from "./changePassword.module.scss";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { User } from "../User";
import { useContext } from "react";
import AppContext from "../AppContext";

function ChangePassword() {
    const value = useContext(AppContext);
    const router = useRouter();
    const userData = User;

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        watch,
    } = useForm();

    const handleChangePassword = (data) => {
        alert(`account created successfully-${JSON.stringify(data)}`);
        // const userData = JSON.parse(localStorage.getItem("signinUser"));
        router.push("/signIn");
    };

    return (
        <div className={styles.container}>
            <div className={styles.containerlist}>
                <h2 className={styles.title}>Change Password</h2>
                <form className={styles.form} onSubmit={handleSubmit(handleChangePassword)}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Password</label>
                        <input
                            className={clsx(
                                styles.formField,
                                errors.password && styles.formFieldError
                            )}
                            type="password"
                            {...register("password", {
                                required: true,
                                minLength: 8,
                                maxLength: 8,
                            })}
                            placeholder="********"
                        />
                        {errors?.password?.type === "required" && (
                            <p className={styles.formFieldErrorMessage}>Field is required</p>
                        )}
                        {errors?.password?.type === "minLength" ||
                        errors?.password?.type === "maxLength" ? (
                            <p className={styles.formFieldErrorMessage}>
                                password must contain 8 characters
                            </p>
                        ) : null}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>confirm Password</label>
                        <input
                            className={clsx(
                                styles.formField,
                                errors.confirmPassword && styles.formFieldError
                            )}
                            type="password"
                            {...register("confirmPassword", { required: true })}
                            placeholder="********"
                        />
                        {errors?.confirmPassword?.type === "required" && (
                            <p className={styles.formFieldErrorMessage}>Field is required</p>
                        )}
                        {watch("confirmPassword") !== watch("password") &&
                        getValues("confirmPassword") ? (
                            <p className={styles.formFieldErrorMessage}>password not matching</p>
                        ) : null}
                    </div>

                    <button type="submit" className={styles.formSubmitBtn}>
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
}
export default ChangePassword;
