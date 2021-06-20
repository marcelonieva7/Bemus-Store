import './App.css';
import './styles/output.css'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import { ItemListContainer} from './components/ItemListContainer/ItemListContainer';
import { Navbar } from './components/NavBar/NavBar';
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer';
import { ItemsInCart } from './context/CartContext';
import Cart from './components/Cart/Cart';
import CheckoutContainer from './components/CheckoutContainer/CheckoutContainer';
import { Wishlist } from './context/WishlistContext' ;
import WishlistContainer from './components/WishlistContainer/WishlistContainer';
import User from './components/User/User';
import NotFounded from './components/NotFounded/NotFounded';
import ProtectRoute from './components/ProtectRoute/ProtectRoute';
import 'firebase/firestore';
import 'firebase/auth';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-white h-auto">
        <ItemsInCart>
        <Wishlist>
          <Navbar/>
            <Switch>
              <Route exact path="/user">
                <ProtectRoute>
                  <User />
                </ProtectRoute>
              </Route>
              <Route exact path="/">
                <ItemListContainer />
              </Route>
              <Route exact path="/category/:id">
                <ItemListContainer/>
              </Route>
              <Route exact path="/item/:id">
                <ItemDetailContainer/>
              </Route>
              <Route exact path="/checkout">
                <ProtectRoute>
                  <CheckoutContainer/>
                </ProtectRoute>
              </Route>
              <Route exact path="/cart">
                <Cart/>
              </Route>
              <Route exact path="/wishlist">
                <WishlistContainer/>
              </Route>
              <Route exact path="*">
                <NotFounded title={"Página no encontrada"}/>
              </Route>
            </Switch>
            <Footer/>
        </Wishlist>
        </ItemsInCart>  
      </div>
    </BrowserRouter>
  )};

export default App;