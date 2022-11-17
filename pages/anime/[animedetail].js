import { useRouter } from 'next/router'
import styles from './Anime.module.scss'

function AnimeDetail(){
    const router = useRouter();
    const data = router.query;
    if(!data) return "Loading"
    return(
        <div className={styles.box}>
            <h1 className={styles.detailTitle}>Anime Details </h1>
            <img className={styles.coverimg} src={data.image} alt="hero"/>
            <p>{data.title}</p>
            <p>{data.description}</p>
            <p>Producer:{data.producer}</p>
            <p>Director:{data.director}</p>
            <p>Release date to running time:{data.release_date}-{data.running_time}</p>
        </div>
    )
}
export default AnimeDetail