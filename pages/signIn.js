import {  useState } from 'react'
import Link from 'next/link'
import styles from './signUp.module.scss'
import {useRouter} from 'next/router'

function SignIn(){
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleChange = (event) => {
    const {name,value}=event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push('/animestatic')
    setUser({name:"",email:"",password:""})
  };

  return(
    <div className={styles.container}>
      <div className={styles.containerlist}>
      <h2 className={styles.title}>Sign In</h2>
      <form className={styles.card} onSubmit={handleSubmit}>
        <label>Email</label>
        <input required type='email' name='email' value={user.email} onChange={handleChange}/>
        <label>Password</label>
        <input required type='text' maxLength='10'  name='password' value={user.password } onChange={handleChange}/>
        <p>forgot password?</p>
           <button type='submit' className={styles.create}>Sign in</button>
      </form>
      </div>
    </div>
  )
}
export default SignIn