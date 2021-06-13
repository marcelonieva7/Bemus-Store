import { useState } from 'react';
import { useFirestore , useFirestoreDocData} from 'reactfire';
import { useTransition } from "react-spring";
import SearchOrderModal from '../SearchOrderModal/SearchOrderModal'
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

const SearchOrder = () => {
    const [orderId, setOrderID] = useState("undefined")
    const [modalVisible, setModalVisible] = useState(false);
    const { register, handleSubmit , formState: { errors } } = useForm();

    const fadingAnimation = useTransition(modalVisible, null, { 
        from: { opacity: 0, transform: "translateY(-40px)" }, 
        enter: { opacity: 1, transform: "translateY(0px)" }, 
        leave: { opacity: 0, transform: "translateY(-40px)" } 
    });

    const orderRef = useFirestore()
        .collection('orders')
        .doc(orderId);
    
    const { status, data:order } = useFirestoreDocData(orderRef)

    const trimField = () => value => ((value.trim() !== "" && value.trim().length === 20 ) || `20 caracteres sin espacios`)
    
    const onSubmit = ({order}) => {
        setOrderID(order)
        setModalVisible(true)
    }    

    return (
        <div className="mt-10">
            <h2 className="text-lg mb-2">Buscar Orden</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <ErrorMessage errors={errors} name="order" as={<span className="text-red-500 block"/>}/>
                    <input name="order" type="text" placeholder="Ingresar Order Id" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full md:w-1/2 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    {...register('order', {
                                required: "El id de la orden es requerido",
                                validate: trimField()
                    })} />
                </div>
                <button className="btn-buy mt-3" type="submit" >{status === "loading" ?
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