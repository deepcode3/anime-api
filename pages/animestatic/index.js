import Link from 'next/link'
import styles from './Anime.module.scss'
import ApiCall from '../../utils/apiCall'

function AnimeStatic({animes}){
    return(
        <div className={styles.container}>
        <h1 className={styles.title}>Anime List static</h1>
        <div className={styles.containerlist}>
            {
             animes.map(d=>{
                return(
                   <div  className={styles.card} key={d.id}>
                       <Link href={`animestatic/${d.id}`}> 
                       <img className={styles.animeCover} src={d.image} alt='cover'/>
                  <p className={styles.animeTitle}>{d.title}</p>
                  <p className={styles.animeTitle}>{d.original_title_romanised}</p>
                    </Link>
                    </div>
                    )
                })
            }
    </div>
        </div>
       ) 
}
export default AnimeStatic


export async function getStaticProps(){
    const url=`https://ghibliapi.herokuapp.com/films`
     const data=await ApiCall(url)

    return{
        props:{
            animes:data,
        }
    }
}