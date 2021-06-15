import React from 'react';
import { useLocation } from 'react-router-dom';
import { ItemList } from '../ItemList/ItemList';

export const ItemListContainer = () => {
    const {pathname} = useLocation()    
    return (
        <React.Fragment>
            {pathname === "/" && <h1 className="text-xl font-semibold p-4 text-purple-400 shadow-lg inline-block rounded-lg mt-2 ml-2 bg-gray-100">Todos los productos</h1>}
            <ItemList/>
        </React.Fragment>
    )
}