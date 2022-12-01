import {  useState } from 'react'
import styles from './signIn.module.scss'
import clsx from 'clsx';
import {useRouter} from 'next/router'
import { useLoginFormValidator } from '../components/useLoginFormValidator';

function SignIn(){
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { errors, signInValidateForm, onBlurField } = useLoginFormValidator(user);

  const handleChange = e => {
    const formName = e.target.name;
    const nextFormState = {
      ...user,
      [formName]: e.target.value,
    };
    setUser(nextFormState);
    if (errors[formName].dirty)
      signInValidateForm({
        user: nextFormState,
        errors,
        formName,
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {isValid}=signInValidateForm({user,errors, forceTouchErrors: true})
    console.log("isValid",isValid)
     if (!isValid) return;
    router.push('/animestatic')
    setUser({email:"",password:""})


    
  };


  return(
    <div className={styles.container}>
      <div className={styles.containerlist}>
      <h2 className={styles.title}>Sign In</h2>
      <form className={styles.form} onSubmit={handleSubmit}>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Email</label>
          <input className={clsx(styles.formField,
            errors.email.dirty && errors.email.error && styles.formFieldError)} type='email' name='email' value={user.email} onChange={handleChange} onBlur={onBlurField}/>
              {errors.email.dirty && errors.email.error ? (
          <p className={styles.formFieldErrorMessage}>{errors.email.message}</p>) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Password</label>
          <input className={clsx(styles.formField,
            errors.password.dirty && errors.password.error && styles.formFieldError)} type='text' name='password' value={user.password } onChange={handleChange} onBlur={onBlurField}/>
              {errors.password.dirty && errors.password.error ? (
          <p className={styles.formFieldErrorMessage}>{errors.password.message}</p>) : null}
        </div>
        
        <p className={styles.forgotPassword}>forgot password?</p>
        <button type='submit'  className={styles.formSubmitBtn} >Sign in</button>
      </form>
      </div>
    </div>
  )
}
export default SignIn