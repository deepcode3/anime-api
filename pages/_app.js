import "../styles/globals.css";
import { useState } from "react";
import AppContext from "../AppContext";
import { User } from "../User";

function MyApp({ Component, pageProps }) {
    const [userSelected, setUserSelected] = useState({});
    const user = User;
    return (
        <AppContext.Provider
            value={{
                state: {
                    userDetals: user[userSelected],
                    userSelected: userSelected,
                },
                setUserSelected: setUserSelected,
            }}>
            <Component {...pageProps} />
        </AppContext.Provider>
    );
}

export default MyApp;
