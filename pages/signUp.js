import { use, useState } from 'react'
import Link from 'next/link'
import styles from './signUp.module.scss'

function SignUp(){
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
    alert('account created successfully')
    console.log(user);
    setUser({name:"",email:"",password:""})
  };

  return(
    <div className={styles.container}>
      <div className={styles.containerlist}>
      <h2 className={styles.title}>Sign Up</h2>
      <form className={styles.card} onSubmit={handleSubmit}>
        <label>Email</label>
        <input required type='email' name='email' value={user.email} onChange={handleChange}/>
        <label>User Name</label>
        <input required type='text' name='name' value={user.name } onChange={handleChange}/>
        <label>Password</label>
        <input required type='text' name='password' value={user.password } onChange={handleChange}/>
        <button  className={styles.create}>Create Account</button>
        <p>Already have an account? <Link href={'/'}><span>Login</span></Link></p>
      </form>
      </div>
    </div>
  )
}
export default SignUp