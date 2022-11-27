import {  useState } from 'react'
import Link from 'next/link'
import styles from './signUp.module.scss'
import clsx from 'clsx';
import { useLoginFormValidator } from '../components/useLoginFormValidator';

const  SignUp=()=>{
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: ""
  });

  const { errors, validateForm, onBlurField } = useLoginFormValidator(user);

  const handleChange = e => {
    const formName = e.target.name;
    const nextFormState = {
      ...user,
      [formName]: e.target.value,
    };
    setUser(nextFormState);
    if (errors[formName].dirty)
      validateForm({
        user: nextFormState,
        errors,
        formName,
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {isValid}=validateForm({user,errors, forceTouchErrors: true})
    if (!isValid) return;
    alert(`account created successfully-${JSON.stringify(user)}`)
    localStorage.setItem('user',JSON.stringify(user))
    setUser({name:"",email:"",password:"",confirmPassword:""})
  };

  return(
    <div className={styles.container}>
      <div className={styles.containerlist}>
      <h2 className={styles.title}>Sign Up</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Email</label>
          <input className={clsx(styles.formField,
            errors.email.dirty && errors.email.error && styles.formFieldError)}
            type='text'   name='email' value={user.email} onChange={handleChange} onBlur={onBlurField}/>  
            {errors.email.dirty && errors.email.error ? (
          <p className={styles.formFieldErrorMessage}>{errors.email.message}</p>) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>User Name</label>
          <input className={clsx(styles.formField,
            errors.email.dirty && errors.email.error && styles.formFieldError
          )} type='text'   name='name' value={user.name} onChange={handleChange} onBlur={onBlurField} /> 
          {errors.name.dirty && errors.name.error ? (
          <p className={styles.formFieldErrorMessage}>{errors.name.message}</p>) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Password</label>
          <input className={clsx(styles.formField,
            errors.email.dirty && errors.email.error && styles.formFieldError
          )}  type='password' name='password' value={user.password } onChange={handleChange}  onBlur={onBlurField}/>
          {errors.password.dirty && errors.password.error ? (
          <p className={styles.formFieldErrorMessage}>
            {errors.password.message}
          </p>
          ) : null}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>confirm Password</label>
            <input className={clsx(styles.formField,
            errors.email.dirty && errors.email.error && styles.formFieldError
            )}  type='password' name='confirmPassword' value={user.confirmPassword } onChange={handleChange}  onBlur={onBlurField}/>
            {errors.confirmPassword.dirty && errors.confirmPassword.error ? (
            <p className={styles.formFieldErrorMessage}>
            {errors.confirmPassword.message}
            </p>) : null}
          </div>
          
          <div  className={styles.formActions}>
            <button type='submit' className={styles.formSubmitBtn}>Create Account</button>
            <p className={styles.account}>Already have an account? <Link href={'/signIn'} className={styles.signin}>Signin</Link></p>
          </div>
      </form>
      </div>
    </div>
  )
}
export default SignUp