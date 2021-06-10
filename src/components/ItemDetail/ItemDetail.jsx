import React, { useContext, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { ItemCount } from '../ItemCount/ItemCount';
import { CartContext } from '../../context/CartContext';
import { Link } from "react-router-dom";
import { currencyFormat } from '../../currencyFormat';
import FavsWidget from '../FavsWidget/FavsWidget';
import { useTransition } from 'react-spring';
import BuyModal from '../BuyModal/BuyModal'

export const ItemDetail = ({item, id}) => {
    const {fullName, value, stock, imgBig, description, brand, shortName, imgLst} = item
    const [isAdded, setIsAdded] = useState(false)
    const [quant, setQuant] = useState(0)
    const [isInCart, addItem,,,,,,itemQuantity] = useContext(CartContext)

    const [modalVisible, setModalVisible] = useState(false);

    const fadingAnimation = useTransition(modalVisible, null, { 
        from: { opacity: 0, transform: "translateY(-40px)" }, 
        enter: { opacity: 1, transform: "translateY(0px)" }, 
        leave: { opacity: 0, transform: "translateY(-40px)" } 
    });

    const stockToshow = isInCart(id) ? stock - itemQuantity(id) : stock

    const onAdd = (quantityToAdd) => {
        setQuant(quantityToAdd)
        addItem({name: fullName, numberId: id, value: value, brand: brand, img: imgLst}, quantityToAdd, isInCart(id))
        setIsAdded(true)
        setModalVisible(true)
    }
    
    return (
        <section className="text-gray-600 body-font overflow-hidden md:px-6">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap lg:justify-center items-center">
                    {(imgBig && <img alt="Product" className="lg:w-1/2 w-full lg:h-96 h-64 object-contain object-center rounded" src={imgBig}/>) || <Skeleton width ={460} height={370}/>}
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        {imgBig ? <FavsWidget item={item} id={id}/> : <Skeleton/>}
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{brand || <Skeleton/>}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{shortName || <Skeleton/>}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                {(imgBig && <React.Fragment>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <span className="text-gray-600 ml-3">4 Reviews</span>
                                </React.Fragment>) || <Skeleton width={100}/>}
                            </span>
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                {(imgBig && <React.Fragment>
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                    </svg>
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                    </svg>
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                    </svg>
                                    </React.Fragment>) || <Skeleton width={100}/>}
                            </span>
                        </div>
                        <p className="leading-relaxed">{description || <Skeleton count={4}/>}</p>
                        <div className="flex flex-col mt-3">
                        <span className="title-font font-medium text-2xl my-4 text-gray-900">{value ? currencyFormat(value) : <Skeleton width={100}/>}</span>
                            {isAdded ? <Link to={"/cart"} className="self-end px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Terminar Compra</Link>
                                : (stockToshow ? <ItemCount onAdd={onAdd} stock={stockToshow} initial={1} ></ItemCount> : ((brand && <button className="px-8 py-2 bg-gray-600 text-white text-sm font-medium rounded hover:bg-gray-500 focus:outline-none cursor-not-allowed focus:bg-gray-500">Sin Stock</button>) || <Skeleton height={30} width={100}/>))}
                        </div>
                    </div>
                </div>
            </div>
            {fadingAnimation.map( ({ item, key, props: style }) => 
                item && ( <BuyModal style={style} closeModal={() => setModalVisible(false)} key={key} fullName={fullName} quant={quant}/> ) 
            )}
        </section>
    )
}