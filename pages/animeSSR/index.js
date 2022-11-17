import Link from 'next/link'
import styles from './Anime.module.scss'

function AnimeSSR({animes}){
    return(
        <div className={styles.container}>
        <h1 className={styles.title}>Anime List</h1>
        <div className={styles.containerlist}>
            {
             animes.map(d=>{
                return(
                   <div className={styles.card} key={d.id}>
                      <Link href={`animeSSR/${d.id}`}>
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
export default AnimeSSR


export async function getServerSideProps(){
    const response=await fetch(`https://ghibliapi.herokuapp.com/films`)
    const data=await response.json()

    return{
        props:{
            animes:data,
        }
    }
}