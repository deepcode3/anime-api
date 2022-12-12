import styles from "./signIn.module.scss";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { User } from "../User";
import { useContext } from "react";
import AppContext from "../AppContext";
import Link from "next/link";

function SignIn() {
    const value = useContext(AppContext);
    const router = useRouter();
    const userData = User;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const handleSignIn = (data, e) => {
        if (userData) {
            userData.map((user) => {
                if (user?.password !== data?.password) {
                    console.log(" password does not match");
                } else if (user?.email !== data?.email) {
                    console.log("email does not match");
                } else {
                    console.log("successfulyy logged in");
                    router.push("/animestatic");
                    value.setUserSelected(user);
                }
            });
        }
        e.target.reset();
    };

    return (
        <div className={styles.container}>
            <div className={styles.containerlist}>
                <h2 className={styles.title}>Sign In</h2>
                <form className={styles.form} onSubmit={handleSubmit(handleSignIn)}>
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

                    <p className={styles.forgotPassword}>
                        <Link href={"/changePassword"}>forgot password?</Link>
                    </p>
                    <button type="submit" className={styles.formSubmitBtn}>
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}
export default SignIn;
