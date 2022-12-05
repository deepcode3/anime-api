import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Anime.module.scss";
import axios from "axios";
import Head from "../../components/Head";

function AnimeStatic() {
    const animeUrl = `https://ghibliapi.herokuapp.com/films`;

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const apiCall = async () => {
        try {
            const { data: res } = await axios.get(animeUrl);
            setData(res);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        apiCall();
    }, []);

    return (
        <div>
            <Head />
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className={styles.container}>
                    <h1 className={styles.title}>Anime List static</h1>
                    <div className={styles.containerlist}>
                        {data.map((d) => {
                            return (
                                <div className={styles.card} key={d.id}>
                                    <Link href={{ pathname: `/animestatic/${d.id}`, query: d.id }}>
                                        <img
                                            className={styles.animeCover}
                                            src={d.image}
                                            alt="cover"
                                        />
                                        <p className={styles.animeTitle}>{d.title}</p>
                                        <p className={styles.animeTitle}>
                                            {d.original_title_romanised}
                                        </p>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
export default AnimeStatic;
