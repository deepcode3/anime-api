import styles from '../../styles/Anime.module.scss'

function AnimeDetailStatic({animes}){
    return(
        <div>
            <h1>Showing anime detail SSR</h1>
            {
                animes.map(anime=>{
                    return(
                        <div key={anime.id}>
                            <h3>{anime.title}</h3>
                        </div>
                    )
                })
            }
           </div>
    )
}
export default AnimeDetailStatic


export async function getServerSideProps(context){
    const {params}=context
    const {id}=params
    const response=await fetch(`https://ghibliapi.herokuapp.com/films?id=${id}`)
    const data=await response.json()
   console.log('data',data)
    return{
        props:{
            animes:data,
        }
    }
}