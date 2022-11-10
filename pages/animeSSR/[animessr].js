import styles from '../../styles/Anime.module.scss'

function AnimeDetailStatic({animes}){
    return(
        <>
          {
                animes.map(anime=>{
                    return(
                        <div className={styles.box} key={anime.id}>
                        <h1 className={styles.detailTitle}>Anime Details </h1>
                        <img className={styles.coverimg} src={anime.image} alt="hero"/>
                        <p>{anime.title}</p>
                        <p>{anime.description}</p>
                        <p>Producer:{anime.producer}</p>
                        <p>Director:{anime.director}</p>
                        <p>Release date to running time:{anime.release_date}-{anime.running_time}</p>
                    </div>
                    )
                })
            }
           </>
    )
}
export default AnimeDetailStatic


export async function getServerSideProps(context){
    const {params}=context
    const {animessr}=params
    const response=await fetch(`https://ghibliapi.herokuapp.com/films?id=${animessr}`)
    const data=await response.json()
   console.log('data',data)
    return{
        props:{
            animes:data,
        }
    }
}