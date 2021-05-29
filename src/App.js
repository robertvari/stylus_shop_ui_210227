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
import SignInPage from "./components/User/SignInPage";
import RegistrationPage from "./components/User/RegistrationPage";
import PasswordResetPage from "./components/User/PasswordResetPage";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import ProfilePage from "./components/User/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import RegistrationEmailSentPage from "./components/User/RegistrationEmailSentPage";

import {ShoppingCartProvider} from "./components/contexts/ShoppingCartContext";
import {UserProvider} from "./components/contexts/UserContext";


function App() {
  return (
    <Router>
        <UserProvider>

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
                        <Route path="/registration-email-sent" component={RegistrationEmailSentPage}/>
                        <Route path="/password-reset" component={PasswordResetPage}/>

                        <ProtectedRoute path="/profiles/:profile_url" component={ProfilePage}/>


                        <Route path="/" component={Home}/>
                    </Switch>
                </div>
                </div>

                <Footer/>
            </div>

            </ShoppingCartProvider>

        </UserProvider>
    </Router>
  );
}

export default App;
