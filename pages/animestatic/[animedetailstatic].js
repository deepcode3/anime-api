import styles from '../../styles/Anime.module.scss'

function AnimeDetailStatic({anime}){
    return(
        <div className={styles.box}>
              <h1 className={styles.detailTitle}>Anime Details </h1>
            <img className={styles.coverimg} src={anime.image} alt="hero"/>
            <p>{anime.title}</p>
            <p>{anime.description}</p>
            <p>Producer:{anime.producer}</p>
            <p>Director:{anime.director}</p>
            <p>Release date to running time:{anime.release_date}-{anime.running_time}</p>
          {/* {
                anime.map(a=>{
                    return(
                        <div key={a.id}>
                            <h3>{a.title}</h3>
                        </div>
                    )
                })
            }  */}
           
        </div>
    )
}
export default AnimeDetailStatic

export async function getStaticPaths(){

    const response=await fetch(`https://ghibliapi.herokuapp.com/films`)
    const data=await response.json()

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
    //const {id}=params
    //const response=await fetch(`https://ghibliapi.herokuapp.com/films?id=${id}`)
    const response=await fetch(`https://ghibliapi.herokuapp.com/films/${params.animedetailstatic}`)
    const data=await response.json()
    console.log('data',data)

    return{
        props:{
            anime:data,
        }
    }
}



        // paths:[
        //     {
        //         params:{animedetailstatic:'1'}
        //     },
        //     {
        //         params:{animedetailstatic:'2'}
        //     },
        // ],