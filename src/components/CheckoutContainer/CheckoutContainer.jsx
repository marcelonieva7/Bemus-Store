import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import  firebase from "firebase/app"
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { useFirestore } from 'reactfire';

const CheckoutContainer = ({user}) => {
    const [orderId, setOrderId] = useState("")
    const [loading, setLoading] = useState(false)

    const [,, addedItems, clear,, totalAmount] = useContext(CartContext)
    
    const db = useFirestore();

    const finishBuy = async ({name, celphone}) => {
        try{
            setLoading(true)
            const items = addedItems.map(item => ({id: item.item.numberId, title: item.item.name, price: item.item.value, quantity: item.quantity}))

            const itemsId = items.map(item => item.id)

            const itemsToUpdate = db.collection("items").where(firebase.firestore.FieldPath.documentId(), "in", itemsId);
            
            const query = await itemsToUpdate.get()
            const batch = db.batch()
            let outOfStock = []

            query.docs.forEach((ds, idx)=> {
                ds.data().stock >= items[idx].quantity ? batch.update(ds.ref , {stock: (ds.data().stock - items[idx].quantity)})
                : outOfStock.push({...ds.data(), id: ds.id})
            })        

            outOfStock.length === 0 ? await batch.commit() : alert(`Sin stock: ${outOfStock}`)

            const buyer = {
                name: name,
                phone: celphone,
                email: user.email
            }

          //   fetch("https://api.staticforms.xyz/submit", {
          //     method: 'POST',
          //     body: {
          //       accessKey: "f06339e6-fa4a-46c4-8433-b94d693e60d4",
          //       name : name
          //     }
          //  })
          //  .then(function(response) {
          //     console.log(response)
           
          //  })
          //  .catch(function(err) {
          //     console.log(err);
          //  });

            const newOrder = {
                buyer: buyer,
                items: items,
                date: firebase.firestore.Timestamp.fromDate(new Date()),           
                total: totalAmount()
            }
            
            const orders = db.collection("orders")
            
            const {id} = await orders.add(newOrder)
            
            setOrderId(id)
            clear()
        }
        catch(err){
            alert(`ocurrio un error ${err}`)
        }  
    }
    
    return (
        <React.Fragment>
            {loading ? 
            (<div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 w-80 mx-auto mt-[33%] lg:mt-40">
            <div className="w-full h-full text-center">
              <div className="flex h-full flex-col justify-between">
                {orderId ? (<svg className="h-12 w-12 mt-4 m-auto text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7">
                  </path>
                </svg>) : <Skeleton width={70} height={40}/>}
                {orderId ? (<p className="text-gray-600 dark:text-gray-100 text-md py-2 px-6">
                  Su orden
                  <span className="text-gray-800 dark:text-white font-bold">
                    {` ${orderId} `}
                  </span>
                  ha sido generada exitosamente.
                </p>): <Skeleton count={2}/>}
                <div className="flex items-center justify-between gap-4 w-full mt-8">
                  {orderId ? (<Link to={'/'} className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Seguir Comprando
                  </Link>) : <Skeleton width={290} height={30}/>}
                </div>
              </div>
            </div>
          </div>
          )
          : <CheckoutForm finishBuy={finishBuy} user={user}/>}
        </React.Fragment>);
}
 
export default CheckoutContainer;