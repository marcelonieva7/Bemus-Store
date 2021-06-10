import React from "react"
import { animated } from "react-spring"

const BuyModal = ({ style, closeModal, quant, fullName }) => (
    <animated.li style={style} className="modal rounded-lg h-auto w-5/6 md:w-1/2 left-[8%] top-[15%] md:left-1/4">
        <div className="flex flex-col max-w-3xl md:max-w-full p-3 space-y-4 sm:p-5 bg-coolGray-50 text-coolGray-800">
            <h2 className="text-lg text-center font-semibold">{`Agregaste a tu carrito ${quant} ${fullName}`}</h2>
        </div>
    <button className="modal-close-button w-[70%] md:w-[40%] lg:w-1/4 rounded-lg" onClick={closeModal}>
        Ok
    </button>
    </animated.li>
  );

export default BuyModal;