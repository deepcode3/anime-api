import Link from 'next/link'

function Home(){
  return(
    <div>
      <h1>Home page</h1>
      <button>
        <Link href='/anime'>Anime List</Link>
      </button>
      <button>    
        <Link href='/animeSSR'>Anime List Server Side Rendering</Link>
      </button>
      <button>      
        <Link href='/animestatic'>Anime List Static Integration</Link>
      </button>
    </div>
  )
}
export default Home