import Link from 'next/link'
import styles from '../styles/home.module.scss'

function Home(){
  return(
    <div className={styles.container}>
      <Link  href='/signUp'><button>signup</button></Link>
      <Link  href='/animestatic'><button>anime list using static</button> </Link>
    </div>
  )
}
export default Home