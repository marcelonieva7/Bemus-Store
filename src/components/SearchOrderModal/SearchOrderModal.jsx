import React from "react"
import Skeleton from "react-loading-skeleton";
import { animated } from "react-spring"
import { currencyFormat } from "../../utils/currencyFormat";

const SearchOrderModal = ({ style, closeModal, status, order, orderId }) => (
    <animated.div style={style} className="w-screen h-screen absolute inset-0">
    <div className="bg-gray-400 opacity-60 h-full w-full"></div>
    <div className="modal rounded-lg h-auto w-5/6 md:w-1/2 left-[8%] top-[15%] md:left-1/4 p-2">
    {status === 'loading' ?
        <Skeleton height={30}/>
        :((orderId !== 'undefined' && !order.total) ? <span>Orden inexistente</span>
            :<div className="flex flex-col max-w-3xl md:max-w-full p-3 space-y-4 sm:p-5 bg-coolGray-50 text-coolGray-800">
                <h2 className="text-xl font-medium">Orden <span className="font-semibold text-indigo-400">{order.NO_ID_FIELD}</span></h2>
                <ul className="flex flex-col divide-y divide-coolGray-300">
                {order.items.map(item=> (
                    <li key={item.id} className="py-3">
                        <div className="flex justify-between w-full pb-2 space-x-2">
                            <div className="space-y-1 text-left">
                                <h3 className="text-lg font-semibold leading-snug sm:pr-8">{item.title}</h3>
                                <p className="text-sm text-coolGray-600">{`${item.quantity} x ${currencyFormat(item.price)}`}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-semibold">{currencyFormat(item.price * item.quantity)}</p>
                            </div>
                        </div>
                    </li>
                    ))}
                </ul>
                <div className="space-y-1 text-right">
                    <p>Total: 
                        <span className="font-semibold">{currencyFormat(order.total)}</span>
                    </p>
                </div>            
            </div>
        )
                }
    <button className="modal-close-button w-[70%] md:w-[50%] rounded-lg mb-2" onClick={closeModal}>
        Cerrar
    </button>
    </div>
    </animated.div>
  );

export default SearchOrderModal;