import React, { useEffect } from 'react';
import { useState } from 'react';

export const CartContext = React.createContext()

export const ItemsInCart = ({children}) => {
    const [addedItems, setAddedItems] = useState([])
    const [totalQuantity, setTotalQuantity] = useState(0)

    useEffect(()=> {
        const localItems = JSON.parse(localStorage.getItem('itemsLocal')) || []
        setAddedItems(localItems)
        setTotalQuantity(localItems.reduce((i0, i1)=> i0 + i1.quantity, 0))
    },[])

    const isInCart = (id) => addedItems.some(item => item.item.numberId === id);

    const addItem = (item, quantity, isIn) => {
        const r = addedItems
        const itemToAdd = {"item": item, "quantity": quantity}
        // eslint-disable-next-line no-unused-expressions
        isIn ? (r[r.findIndex(it=> it.item.numberId === item.numberId)].quantity += quantity, setAddedItems(r), setTotalQuantity(r.reduce((i0, i1)=> i0 + i1.quantity, 0)), localStorage.setItem('itemsLocal', JSON.stringify(r)))
           : (setAddedItems([...addedItems, itemToAdd]), setTotalQuantity([...addedItems, itemToAdd].reduce((i0, i1)=> i0 + i1.quantity, 0)), localStorage.setItem('itemsLocal', JSON.stringify([...addedItems, itemToAdd])))
    }

    const removeItem = (itemId) => {
        const filterItems = addedItems.filter(it => it.item.numberId !== itemId)
        setAddedItems(filterItems);
        setTotalQuantity(filterItems.reduce((i0, i1)=> i0 + i1.quantity, 0))
        localStorage.setItem('itemsLocal', JSON.stringify(filterItems));
    }

    const clear = () => {
        setAddedItems([])
        setTotalQuantity(0)
        localStorage.removeItem("itemsLocal")
    };

    const totalAmount = () => addedItems.reduce((acum, nextItem) => (acum + (nextItem.item.value * nextItem.quantity)),0)
    
    const itemQuantity = (id) => addedItems.find(item => item.item.numberId === id).quantity;

    return (
        <CartContext.Provider value={[isInCart, addItem, addedItems, clear, removeItem, totalAmount, totalQuantity, itemQuantity]}>
            {children}
        </CartContext.Provider>
    )
}