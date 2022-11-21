import styles from './Anime.module.scss'
import ApiCall from '../../utils/apiCall'

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

export async function getStaticPaths(){
    const url=`https://ghibliapi.herokuapp.com/films`
    const data=await ApiCall(url)

    const paths=data.map(d=>{
        return{
            params:{
                animedetailstatic:`${d.id}`
            }
        }
    })
    return{
        paths,
        fallback:false,
    }
}

export async function getStaticProps(context){
    const {params}=context
    const {animedetailstatic}=params
    const url=`https://ghibliapi.herokuapp.com/films?id=${animedetailstatic}`
   const data=await ApiCall(url)
    console.log('data',data)

    return{
        props:{
            animes:data,
        }
    }
}









        // <div className={styles.box}>
        //       <h1 className={styles.detailTitle}>Anime Details </h1>
        //     <img className={styles.coverimg} src={animes.image} alt="hero"/>
        //     <p>{animes.title}</p>
        //     <p>{animes.description}</p>
        //     <p>Producer:{animes.producer}</p>
        //     <p>Director:{animes.director}</p>
        //     <p>Release date to running time:{animes.release_date}-{animes.running_time}</p>
        // </div>

        // paths:[
        //     {
        //         params:{animedetailstatic:'1'}
        //     },
        //     {
        //         params:{animedetailstatic:'2'}
        //     },
        // ],