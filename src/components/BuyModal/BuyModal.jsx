import React, { useEffect } from "react"
import { animated } from "react-spring"

const BuyModal = ({ style, closeModal, quant, fullName }) => {
    useEffect(()=> {
        setTimeout(()=> closeModal(), 4000)
    })
    return(
        <animated.div style={style} className="w-screen h-screen fixed inset-0">
            <div className="bg-gray-400 opacity-60 h-full w-full"></div>
            <div className="modal rounded-lg h-auto w-5/6 md:w-1/2 left-[8%] top-[15%] md:left-1/4 p-2">
                <h2 className="text-lg text-center font-semibold mt-2">{`Agregaste a tu carrito ${quant} ${fullName}`}</h2>
                <button className="modal-close-button w-[70%] md:w-[40%] lg:w-1/4 rounded-lg mb-3" onClick={closeModal}>
                    Ok
                </button>
            </div>
        </animated.div>
    )
}

export default BuyModal;