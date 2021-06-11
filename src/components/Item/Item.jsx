import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ItemCount } from '../ItemCount/ItemCount';
import { CartContext } from '../../context/CartContext';
import Skeleton from 'react-loading-skeleton';
import { currencyFormat } from '../../utils/currencyFormat';
import FavsWidget from '../FavsWidget/FavsWidget';
import { animated, useTransition } from 'react-spring';
import BuyModal from '../BuyModal/BuyModal';

export const Item = (props) => {
    const {name, value, stock, img, id, style} = props
    const [isInCart, addItem,,,,,,itemQuantity] = useContext(CartContext)
    const [quant, setQuant] = useState(0)
    const [modalVisible, setModalVisible] = useState(false);
    
    const fadingAnimation = useTransition(modalVisible, null, { 
        from: { opacity: 0, transform: "translateY(-40px)" }, 
        enter: { opacity: 1, transform: "translateY(0px)" }, 
        leave: { opacity: 0, transform: "translateY(-40px)" } 
    });

    const stockToshow = isInCart(id) ? stock - itemQuantity(id) : stock

    const onAdd = (quantityToAdd) => {
        addItem({name: name, numberId: id, value: value, img: img}, quantityToAdd, isInCart(id))
        setQuant(quantityToAdd)
        setModalVisible(true)        
    }
    
    return (
        <animated.div style={style} className="md:flex md:items-center md:justify-center mx-2 my-20 p-4 md:mx-20 lg:mx-36 md:px-2 lg:px-1 rounded-md shadow-lg">
            {img ? <div className="md:hidden"><FavsWidget id={id}/></div> : <Skeleton/>}
            <div className="w-full h-64 md:w-1/4 lg:h-48">
                {(img && <Link to={`/item/${id}`}><img alt="" className="h-full w-full rounded-md object-contain max-w-lg mx-auto" src={img}/></Link>) || <Skeleton className="h-full w-full rounded-md max-w-lg mx-auto"/>}
            </div>
            <div className="w-full max-w-lg ml-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
                <div className="flex justify-between">
                    <Link to={`/item/${id}`}><h3 className="text-gray-700 uppercase text-lg md:inline-block mr-3">{name || <Skeleton/>}</h3></Link>
                    {img ? <div className="hidden md:inline-block"><FavsWidget id={id}/></div> : <Skeleton/>}
                </div>
                <span className="text-gray-500 mt-3 md:block">{value ? currencyFormat(value) : <Skeleton/>}</span>
                <hr className="my-3" />
                {name ? (stockToshow ? <ItemCount initial={1} onAdd={onAdd} stock={stockToshow} id={id} />
                : <button className="px-8 py-2 bg-gray-600 text-white text-sm font-medium rounded hover:bg-gray-500 focus:outline-none cursor-not-allowed focus:bg-gray-500">Sin Stock</button>) : <Skeleton height={30} width={100}/>}
            </div>
            {fadingAnimation.map( ({ item, key, props: style }) => 
                item && ( <BuyModal style={style} closeModal={() => setModalVisible(false)} key={key} fullName={name} quant={quant}/> ) 
            )}
        </animated.div>
    )
}