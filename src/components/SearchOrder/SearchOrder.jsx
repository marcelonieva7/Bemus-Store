import { useState } from 'react';
import { useFirestore , useFirestoreDocData} from 'reactfire';
import { useTransition } from "react-spring";
import SearchOrderModal from '../SearchOrderModal/SearchOrderModal'

const SearchOrder = () => {
    const [orderId, setOrderID] = useState("undefined")
    const [modalVisible, setModalVisible] = useState(false);

    const fadingAnimation = useTransition(modalVisible, null, { 
        from: { opacity: 0, transform: "translateY(-40px)" }, 
        enter: { opacity: 1, transform: "translateY(0px)" }, 
        leave: { opacity: 0, transform: "translateY(-40px)" } 
    });

    const orderRef = useFirestore()
        .collection('orders')
        .doc(orderId);
    
    const { status, data:order } = useFirestoreDocData(orderRef);

    return (
        <div className="mt-10">
            <h2 className="text-lg mb-2">Buscar Orden</h2>
            <form onSubmit={ (e) =>{
                e.preventDefault()
                const {value} = e.target.order
                // eslint-disable-next-line no-unused-expressions
                value.trim() !== "" ? (setOrderID(value.trim()), setModalVisible(true)) : alert("Ingresa un id valido")
            }}>
                <input name="order" required type="text" placeholder="Ingresar Order Id" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full md:w-1/2 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
                <button className="btn-buy mt-3 md:mt-0 md:ml-3" type="submit" >{status === "loading" ?
                    <svg className="animate-spin -ml-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    :"Buscar"}
                </button>
            </form>
            {fadingAnimation.map( ({ item, key, props: style }) => 
                item && ( <SearchOrderModal style={style} closeModal={() => setModalVisible(false)} key={key} order={order} status={status} orderId={orderId}/> ) 
            )}
        </div>
    );
}
 
export default SearchOrder;