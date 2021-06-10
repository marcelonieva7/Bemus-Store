import SearchOrder from "../SearchOrder/SearchOrder"
import { useAuth } from 'reactfire';

const User = ({ user }) => {
    const auth = useAuth();

    const signOut = () => auth.signOut()
    return (
        <div className="container px-3 md:px-16 lg:px-32 py-24 mx-auto text-center">
            <div className="m-4 bg-blue-200 rounded-lg shadow-lg px-3 py-6">
                <h1 className="text-xl">Hola {user.displayName || "Usuario"} 👋</h1>
                <button className="main-button" id="signOut" onClick={signOut}>
                    Cerrar sesion
                </button>
                <SearchOrder/>
            </div>
        </div>
    );
}
 
export default User;