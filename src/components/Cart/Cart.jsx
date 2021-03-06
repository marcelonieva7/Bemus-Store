import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useTransition } from "react-spring";
import { CartContext } from '../../context/CartContext';
import {currencyFormat} from '../../utils/currencyFormat';
import ItemCart from "../ItemCart/ItemCart";
import empty from '../../img/empty.svg'

const Cart = () => {
    const [,,addedItems, clear, removeItem, totalAmount] = useContext(CartContext)

    const fadingAnimation = useTransition(addedItems, addedItems.map(item => item.item.numberId), { 
        from: { opacity: 0, transform: "translateX(-40px)" }, 
        enter: { opacity: 1, transform: "translateX(0px)" }, 
        leave: { opacity: 0, transform: "translateX(-40px)" } 
    });

    return (
        <React.Fragment>        
        <div className="flex flex-col max-w-3xl md:max-w-full p-6 space-y-4 sm:p-10 bg-coolGray-50 text-coolGray-800">
            {addedItems.length ? <h2 className="text-xl font-semibold">Tu Carrito</h2>
            :<div className="m-4 bg-blue-200 rounded-lg shadow-lg px-3 py-6 flex flex-col justify-center items-center lg:mx-80">
                <h1 className="text-xl py-3">Tu carrito está vacío</h1>
                <img src={empty} alt="Ilustracion 404." />
                <Link to={"/"} className="px-6 py-2 mt-4 border rounded-md border-indigo-600">Seguir Comprando</Link>
            </div>}
            <ul className="flex flex-col divide-y divide-coolGray-300">
            {fadingAnimation.map( ({ item, key, props: style }) => <ItemCart style={style} key={key} item={item} removeItem={removeItem}/>)}
            </ul>
            {!addedItems.length || <div>
                    <div className="space-y-1 text-right">
                    <p>Total: 
                        <span className="font-semibold">{currencyFormat(totalAmount())}</span>
                    </p>
                </div>
                <div className="flex justify-between space-x-4">
                    <button onClick={clear} className="px-6 py-2 border rounded-md bg-red-500 text-coolGray-50">
                        Vaciar
                    </button>
                    <Link to={"/checkout"}>
                        <button className="px-6 py-2 border rounded-md bg-indigo-600 text-coolGray-50">
                            Pagar
                        </button>
                    </Link>
                </div>
            </div>}
        </div>
    </React.Fragment>
    )
}
 
export default Cart;