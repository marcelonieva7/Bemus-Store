import { useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";

const FavsWidget = ({id}) => {    
    const [, isInFavs, addFav, removeFav] = useContext(WishlistContext)
    return (
        <button  onClick={()=>{isInFavs(id) ? removeFav(id) :addFav(id)}} className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 mb-2">
            <svg fill={isInFavs(id) ? "purple" : "currentColor"} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
        </button>
    );
}
 
export default FavsWidget;