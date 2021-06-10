import React, { useState } from "react";

export const ItemCount = ({ initial, stock, onAdd }) => {
    const [count, setCount] = useState(initial);

    const subtract = ()=> {
        (count > initial) && setCount(count - 1)
    }

    const add = ()=> {
        (count < stock) && setCount(count + 1)
    }

    const buy = ()=> {
        onAdd(count)
        setCount(initial)
    }

    return (
        <div className="flex justify-between items-center flex-row">
            <div className="">
                <label className="text-gray-700 text-sm" htmlFor="count">Cantidad:</label>
                <div className="flex items-center mt-1">
                    <button onClick={subtract} className="text-gray-500 focus:outline-none focus:text-gray-600">
                        <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </button>
                    <span className="text-gray-700 text-lg mx-2">{count}</span>
                    <button onClick={add} className="text-gray-500 focus:outline-none focus:text-gray-600">
                        <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </button>
                </div>
            </div>
            <button onClick={buy} className="btn-buy">Agregar</button>
        </div >
    )
}