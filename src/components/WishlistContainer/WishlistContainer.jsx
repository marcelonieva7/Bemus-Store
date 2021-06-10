import { useContext, useEffect, useState } from "react";
import { FavsContext } from "../../context/FavsContext";
import { useFirestore } from 'reactfire';
import { Item } from "../Item/Item";
import { useTransition } from "react-spring";

const WishlistContainer = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [favs] = useContext(FavsContext)
    const db = useFirestore()
    const loader = [{id: "01"},{id: "02"},{id: "03"}]

    const fadingAnimation = useTransition(items, items.map((item, index) => index), { 
        from: { opacity: 0, transform: "translateX(-40px)" }, 
        enter: { opacity: 1, transform: "translateX(0px)" }, 
        leave: { opacity: 0, transform: "translateX(-40px)" } 
    });

    useEffect(()=> {
        const getData = async ()=> {
            try {
                const collection = db.collection("items")
                
                await db.runTransaction(async (transaction) => {
                    const query = favs.map((id) => transaction.get(collection.doc(id)));
                    const getItems = await Promise.all(query)
                    const items = getItems.map(el => ({...el.data(), id: el.id}));
                    setItems(items)                
                });
                setIsLoading(false)
            }
            catch (e) {
                alert("Transaction failed: ", e);
            }
        }
        getData()

    },[favs, db])
    
    return (
        isLoading  ? <div>{loader.map((item)=> <Item key={item.id} id={item.id} name={item.fullName} value={item.value} stock={item.stock} img={item.imgLst}/>)}</div>
        : items.length ? (
        // <div>{items.map((item)=> <Item key={item.id} id={item.id} name={item.fullName} value={item.value} stock={item.stock} img={item.imgLst}/>)}</div>
        fadingAnimation.map( ({ item, key, props: style }) => <Item style={style} key={key} id={item.id} name={item.fullName} value={item.value} stock={item.stock} img={item.imgLst}/>)

        )
            :<div className="flex flex-col items-center justify-start h-screen pt-40">
                <h3 className="text-xl font-semibold my-2">Tu lista de favoritos esta vacia</h3>
            </div>
    )
}
 
export default WishlistContainer;