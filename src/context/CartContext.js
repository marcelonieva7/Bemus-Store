import React, { useEffect } from 'react';
import { useState } from 'react';

export const CartContext = React.createContext()

export const ItemsInCart = ({children}) => {
    const [addedItems, setAddedItems] = useState([])
    const [totalQuantity, setTotalQuantity] = useState(0)
        
    useEffect(()=> {
        const localItems = JSON.parse(localStorage.getItem('itemsLocal')) || []
        setAddedItems(localItems)
    },[])
    
    useEffect(()=> {
        localStorage.setItem('itemsLocal', JSON.stringify(addedItems));
        setTotalQuantity(addedItems.reduce((acum, i1)=> acum + i1.quantity, 0))
    },[addedItems])
    
    const isInCart = (id) => addedItems.some(item => item.item.numberId === id);

    const addItem = (item, quantity, isIn) => {
        if (isIn) {
            const items = addedItems
            items[items.findIndex(it=> it.item.numberId === item.numberId)].quantity += quantity
            setAddedItems(items)
            setTotalQuantity(items.reduce((acum, i1)=> acum + i1.quantity, 0))
            localStorage.setItem('itemsLocal', JSON.stringify(items));

        }
        else {
            const itemToAdd = {"item": item, "quantity": quantity}
            setAddedItems([...addedItems, itemToAdd])
        }
    }

    const removeItem = (itemId) => {
        const filterItems = addedItems.filter(it => it.item.numberId !== itemId)
        setAddedItems(filterItems);
    }

    const clear = () => {
        setAddedItems([])
    };

    const totalAmount = () => addedItems.reduce((acum, nextItem) => (acum + (nextItem.item.value * nextItem.quantity)),0)
    
    const itemQuantity = (id) => addedItems.find(item => item.item.numberId === id).quantity;

    return (
        <CartContext.Provider value={[isInCart, addItem, addedItems, clear, removeItem, totalAmount, totalQuantity, itemQuantity]}>
            {children}
        </CartContext.Provider>
    )
}