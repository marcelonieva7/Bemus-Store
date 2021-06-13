import React from 'react';
import { useLocation } from 'react-router-dom';
import { ItemList } from '../ItemList/ItemList';

export const ItemListContainer = () => {
    const {pathname} = useLocation()    
    return (
        <React.Fragment>
            {pathname === "/" && <h1 className="text-xl p-4 text-purple-700">Todos los productos</h1>}
            <ItemList/>
        </React.Fragment>
    )
}