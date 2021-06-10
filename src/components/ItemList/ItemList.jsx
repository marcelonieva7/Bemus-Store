import React from 'react';
import { useParams } from 'react-router';
import { Item } from '../Item/Item';
import { useFirestore , useFirestoreCollectionData} from 'reactfire';
import NotFounded from '../NotFounded/NotFounded';

export const ItemList = ()=> {
    const id = useParams().id

    const categoryCollection = useFirestore().collection('categories');    
    const categoriesQuery = id ? categoryCollection.where('key', '==', id) : categoryCollection;
    const { status:status1, data: category } = useFirestoreCollectionData(categoriesQuery);
    
    let catId;
    
    if (status1 === "success" ) {
        catId = category.length > 1 ? false : (category.length === 1 ? category[0].NO_ID_FIELD : "404")
    }  
    
    const itemsCollection = useFirestore().collection('items')
    const itemsQuery = catId ? itemsCollection.where('category', '==', catId) : itemsCollection
    const { status, data: items } = useFirestoreCollectionData(itemsQuery)

    const loader = [{id: "01"},{id: "02"},{id: "03"}]

    return (
        status === 'loading'  ?
            <div>{loader.map((item)=> <Item key={item.id} id={item.id} name={item.fullName} value={item.value} stock={item.stock} img={item.imgLst}/>)}</div>
            : (items.length ?
                <div>{items.map((item)=> <Item key={item.NO_ID_FIELD} id={item.NO_ID_FIELD} name={item.fullName} value={item.value} stock={item.stock} img={item.imgLst}/>)}</div>
                : <NotFounded title={"Categoria no encontrada"}/>
            )
    )
}