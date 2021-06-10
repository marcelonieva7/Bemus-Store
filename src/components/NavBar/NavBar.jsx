import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {CartWidget} from '../CartWidget/CartWidget.jsx'
import fav from '../../img/fav.svg'
import user from '../../img/user.svg'
import { useSigninCheck } from 'reactfire';

export const Navbar = () => {
    const toggleMenu = () => {
        const navToggle = document.getElementsByClassName("toggle");
        for (let i = 0; i < navToggle.length; i++) {
            navToggle.item(i).classList.toggle("hidden");
        }
    }

    const { status, data } = useSigninCheck();
    const photoUser =  status === 'success' && data.signedIn && data.user.photoURL

    return (
        <React.Fragment>
            <nav className="navg">
                <Link to={"/"}><div className="flex items-center"><img alt ="logo" className="h-10 w-10 lg:h-16 lg:w-16 pr-1" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"/><h3 className="md:text-2xl text-gray-300">Bemus Store</h3></div></Link>
                <div className="flex lg:hidden">       
                <div className="lg:hidden mr-2">
                    <Link to={"/user"}><img className="inline-block mr-1 rounded-full h-10 w-10" src={photoUser || user} alt="User."/></Link>
                    <Link to={"/wishlist"}><img className=" inline-block mr-1" src={fav} alt="wishlist"/></Link>
                    <CartWidget/>
                </div>
                    <button id="hamburger" onClick={toggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="toggle block icon icon-tabler icon-tabler-menu-2" width={40} height={40} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1={4} y1={6} x2={20} y2={6} />
                        <line x1={4} y1={12} x2={20} y2={12} />
                        <line x1={4} y1={18} x2={20} y2={18} />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="toggle hidden icon icon-tabler icon-tabler-square-x" width={40} height={40} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <rect x={4} y={4} width={16} height={16} rx={2} />
                        <path d="M10 10l4 4m0 -4l-4 4" />
                    </svg>
                    </button>
                </div>
                <div className="toggle hidden lg:flex items-center w-full lg:w-auto text-right text-bold mt-5 lg:mt-0 border-t-2 border-blue-900 md:border-none">
                    <NavLink activeClassName="linkSelected" to={'/category/Smartphones'} className="block md:inline-block text-purple-300 hover:text-blue-500 px-3 py-3 border-b-2 border-gray-200 md:border-none">Smartphones</NavLink>
                    <NavLink activeClassName="linkSelected" to={'/category/Notebooks'} className="block md:inline-block text-purple-300 hover:text-blue-500 px-3 py-3 border-b-2 border-gray-200 md:border-none">Notebooks</NavLink>
                    <NavLink activeClassName="linkSelected" to={'/category/Tablets'} className="block md:inline-block text-purple-300 hover:text-blue-500 px-3 py-3 border-b-2 border-gray-200 md:border-none">Tablets</NavLink>
                    <NavLink activeClassName="linkSelected" to={'/category/Accesorios'} className="block md:inline-block text-purple-300 hover:text-blue-500 px-3 py-3 border-b-2 border-gray-200 md:border-none">Accesorios</NavLink>
                    <div className="hidden lg:block">
                        <Link to={"/user"}><img className="inline-block mr-1 rounded-full h-11 w-11" src={photoUser || user} alt="User."/></Link>
                        <Link to={"/wishlist"}><img className="p-1 inline-block" src={fav} alt="wishlist"/></Link>
                        <CartWidget />
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}