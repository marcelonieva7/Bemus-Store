import React, { useEffect } from 'react';
import { useState } from 'react';

export const WishlistContext = React.createContext()

export const Wishlist = ({children}) => {
    const [favs, setFavs] = useState([])

    useEffect(()=> {
        const localFavs = JSON.parse(localStorage.getItem('favsLocal')) || []
        setFavs(localFavs)
    },[])

    useEffect(()=> {
        localStorage.setItem('favsLocal', JSON.stringify(favs))
    },[favs])

    const isInFavs = (id) => favs.some(item => item === id);

    const addFav = (item) => {
        setFavs([...favs, item])
    }

    const removeFav = (itemId) => {
        const filterItems = favs.filter(it => it !== itemId)
        setFavs(filterItems);
    }

    const clear = () => {
        setFavs([])
    }

    return (
        <WishlistContext.Provider value={[favs, isInFavs, addFav, removeFav, clear]}>
            {children}
        </WishlistContext.Provider>
    )
}