import useSWR from 'swr'
import Link from 'next/link'
import styles from './Anime.module.scss'

const fetcher=async ()=>{
    const response =await fetch('https://ghibliapi.herokuapp.com/films')
    const data=await response.json()
    return data
}

function AnimeList(){
   const {data,error}=  useSWR('anime',fetcher)

   if(error) return 'An error has occured'
   if(!data) return "Loading"

   return(
    <div className={styles.container}>
        <h1 className={styles.title}>Anime List</h1>
        <div className={styles.containerlist}>
        {
         data.map(d=>{
            return(
               <div className={styles.card} key={d.id}>
                <Link href={{pathname:`/anime/${d.id}`, query: d}}>
                    <img className={styles.animeCover} src={d.image} alt='cover'/>
                  <p className={styles.animeTitle}>{d.title}</p>
                  <p className={styles.animeTitle}>{d.original_title_romanised}</p>
                </Link>
                {/* title image,titles */}
                </div>
                )
            })
        }
        </div>
    </div>
   ) 
}
export default AnimeList