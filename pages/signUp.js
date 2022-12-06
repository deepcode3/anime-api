import { useState } from "react";
import Link from "next/link";
import styles from "./signUp.module.scss";
import clsx from "clsx";
import { useForm } from "react-hook-form";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        watch,
    } = useForm();

    const handleSignUp = (data) => {
        console.log("data", data);
        alert(`account created successfully-${JSON.stringify(data)}`);
        localStorage.setItem(
            "user",
            JSON.stringify({ email: data.email, name: data.name, password: data.password })
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.containerlist}>
                <h2 className={styles.title}>Sign Up</h2>
                <form className={styles.form} onSubmit={handleSubmit(handleSignUp)}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Email</label>
                        <input
                            className={clsx(
                                styles.formField,
                                errors.email && styles.formFieldError
                            )}
                            type="email"
                            {...register("email", {
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            })}
                        />
                        {errors?.email?.type === "required" ? (
                            <p className={styles.formFieldErrorMessage}>Email is required</p>
                        ) : null}
                        {errors?.email?.type === "pattern" ? (
                            <p className={styles.formFieldErrorMessage}>Email is not valid</p>
                        ) : null}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>User Name</label>
                        <input
                            className={clsx(styles.formField, errors.name && styles.formFieldError)}
                            type="text"
                            {...register("name", { required: true })}
                        />
                        {errors?.name?.type === "required" && (
                            <p className={styles.formFieldErrorMessage}>Field is required</p>
                        )}
                    </div>

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

                    <div className={styles.formActions}>
                        <button type="submit" className={styles.formSubmitBtn}>
                            Create Account
                        </button>
                        <p className={styles.account}>
                            Already have an account?{" "}
                            <Link href={"/signIn"} className={styles.signin}>
                                Signin
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default SignUp;
