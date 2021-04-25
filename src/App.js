import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home/Home";
import "./components/styles/main.scss"
import ItemDetailsPage from "./components/Pages/ItemDetailsPage";
import ItemListPage from "./components/Pages/ItemListPage";
import CheckoutPage from "./components/Pages/CheckoutPage";
import SignInPage from "./components/Pages/SignInPage";
import RegistrationPage from "./components/Pages/RegistrationPage";
import PasswordResetPage from "./components/Pages/PasswordResetPage";
import ShoppingCart from "./components/ShoppingCart";

import {ShoppingCartProvider} from "./components/contexts/ShoppingCartContext";


function App() {
  return (
    <Router>
        <ShoppingCartProvider>

        <div className="App">
            <ShoppingCart/>

            <div>
                <Navbar/>

                <div className="content-container">
                <Switch>
                    <Route path="/categories/:category/:subcategory?" component={ItemListPage}/>
                    <Route path="/details/:id" component={ItemDetailsPage}/>
                    <Route path="/checkout" component={CheckoutPage}/>

                    <Route path="/login" component={SignInPage}/>
                    <Route path="/registration" component={RegistrationPage}/>
                    <Route path="/password-reset" component={PasswordResetPage}/>

                    <Route path="/" component={Home}/>
                </Switch>
            </div>
            </div>

            <Footer/>
        </div>

        </ShoppingCartProvider>
    </Router>
  );
}

export default App;
