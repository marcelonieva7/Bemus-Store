import React, { useEffect } from 'react';
import { useState } from 'react';

export const FavsContext = React.createContext()

export const Favorites = ({children}) => {
    const [favs, setFavs] = useState([])

    useEffect(()=> {
        const localFavs = JSON.parse(localStorage.getItem('favsLocal')) || []
        setFavs(localFavs)
    },[])

    const isInFavs = (id) => favs.some(item => item === id);

    const addFav = (item) => {
        setFavs([...favs, item])
        localStorage.setItem('favsLocal', JSON.stringify([...favs, item]))
    }

    const removeFav = (itemId) => {
        const filterItems = favs.filter(it => it !== itemId)
        setFavs(filterItems);
        localStorage.setItem('favsLocal', JSON.stringify(filterItems));
    }

    const clear = () => {
        setFavs([])
        localStorage.removeItem("favsLocal")
    }

    return (
        <FavsContext.Provider value={[favs, isInFavs, addFav, removeFav, clear]}>
            {children}
        </FavsContext.Provider>
    )
}