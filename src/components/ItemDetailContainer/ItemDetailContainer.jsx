import React from 'react';
import { useParams } from "react-router-dom"
import { ItemDetail } from '../ItemDetail/ItemDetail.jsx'
import { useFirestore , useFirestoreDocData} from 'reactfire';
import NotFounded from '../NotFounded/NotFounded.jsx';

export const ItemDetailContainer = ()=> {
    const {id} = useParams()

    const itemRef = useFirestore()
        .collection('items')
        .doc(id);
    
    const { status, data:item } = useFirestoreDocData(itemRef);

    return (
        status === 'loading'  ?
            <ItemDetail item={{}}/>
            : ( item.value ?
                <ItemDetail item={item} id={item.NO_ID_FIELD}/>
                : <NotFounded title={"Item no Encontrado"}/>
            )
    )
}