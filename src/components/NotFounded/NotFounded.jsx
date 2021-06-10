import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import error from '../../img/404.svg'

const NotFounded = ({title}) => {
    const notFounded =
        <div className="container px-3 md:px-16 lg:px-32 py-24 mx-auto text-center">
            <div className="m-4 bg-blue-200 rounded-lg shadow-lg px-3 py-6">
                <h1 className="text-xl py-3">{title}</h1>
                <img src={error} alt="Ilustracion 404." />
                <h2 className="text-lg py-3">redireccionando...</h2>
            </div>
        </div>

    const [state, setState] = useState(notFounded)

    useEffect(()=>{
        setTimeout(()=> setState(<Redirect to="/" />), 4000)
    },[])
    
    return state
}
 
export default NotFounded;