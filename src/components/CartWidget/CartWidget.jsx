import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import cart from '../../img/cart.svg'

export const CartWidget = () => {
    const [,,,,,,totalQuantity] = useContext(CartContext)
    return (
        <span className="relative inline-block">
            <Link to={"/cart"}>
                <img className="inline-block" src={cart} alt="cart"/>
                {totalQuantity ? (<span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{totalQuantity}</span>) : ""}
            </Link>
        </span>
    )
}