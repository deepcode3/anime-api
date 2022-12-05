import { useState, useEffect } from "react";
import styles from "./Anime.module.scss";
import { useRouter } from "next/router";
import axios from "axios";

function AnimeDetailStatic() {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();
    const anime = router.query;
    const animeUrl = `https://ghibliapi.herokuapp.com/films?id=${anime.animedetailstatic}`;

    const apiCall = async () => {
        const { data: res } = await axios.get(animeUrl);
        setData(res);
        setLoading(false);
    };

    useEffect(() => {
        apiCall();
    }, [data]);

    return isLoading ? (
        <p>Loading...</p>
    ) : (
        data.map((anime) => {
            return (
                <div className={styles.box} key={anime.id}>
                    <h1 className={styles.detailTitle}>Anime Details </h1>
                    <img className={styles.coverimg} src={anime.image} alt="hero" />
                    <p>{anime.title}</p>
                    <p>{anime.description}</p>
                    <p>Producer:{anime.producer}</p>
                    <p>Director:{anime.director}</p>
                    <p>
                        Release date to running time:{anime.release_date}-{anime.running_time}
                    </p>
                </div>
            );
        })
    );
}

export default AnimeDetailStatic;
