import Link from 'next/link'

function AnimeStatic({animes}){
    return(
        <div>
            <h1>List of animes</h1>
            {
             animes.map(d=>{
                return(
                   <div key={d.id}>
                       <Link href={`animestatic/${d.id}`}> 
                      <p>Posts-{d.id}</p>
                      <p>Likes-{d.title}</p>
                      <p>Followers-{d.original_title}</p>
                      <p>Following-{d.original_title_romanised}</p>
                      <hr/>
                    </Link>
                    </div>
                    )
                })
            }
    
        </div>
       ) 
}
export default AnimeStatic


export async function getStaticProps(){
    const response=await fetch(`https://ghibliapi.herokuapp.com/films`)
    const data=await response.json()

    return{
        props:{
            animes:data,
        }
    }
}