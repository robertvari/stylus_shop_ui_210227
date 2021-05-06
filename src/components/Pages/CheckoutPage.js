import React, {useContext, Fragment, useState} from 'react';
import {ShoppingCartContext} from "../contexts/ShoppingCartContext";
import CartItem from "../ShoppingCart/CartItem";
import {Link} from "react-router-dom";

function CheckoutPage(props) {
    const {count, shopping_list, total} = useContext(ShoppingCartContext)
    const [error, set_error] = useState(null)

    const [email, set_email] = useState("")
    const [first_name, set_first_name] = useState("")
    const [last_name, set_last_name] = useState("")
    const [company, set_company] = useState("")
    const [address, set_address] = useState("")
    const [apartment, set_apartment] = useState("")
    const [city, set_city] = useState("")
    const [post_code, set_post_code] = useState("")
    const [phone, set_phone] = useState("")

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const _set_error = (message) => {
        set_error(message)
        setTimeout(function(){set_error(null)}, 5000);
    }

    const check_errors = () => {
        set_error(null)

        if(!email){
            _set_error("Email must be filled")
            return false
        } else if(!first_name){
            _set_error("First name must be filled")
            return false
        }else if(!last_name){
            _set_error("Last name must be filled")
            return false
        }else if(!address){
            _set_error("Address must be filled")
            return false
        }else if(!city){
            _set_error("City must be filled")
            return false
        }else if(!post_code){
            _set_error("Post code must be filled")
            return false
        }else if(!phone){
            _set_error("Phone name must be filled")
            return false
        }

        return true
    }

    const check_out_action = () => {
        if(check_errors()){
            console.log("Check out")
        }
    }

    return (
        <div className="checkout-container">
            <div className="personal-data-container">
                <h2>Contact information</h2>

                <hr/>
                <small>Already have an account? <Link to="/login">Log in</Link></small>

                <input type="email" placeholder="Email" value={email} onChange={e => set_email(e.target.value)}/>

                <h2>Shipping address</h2>

                <div className="name-container">
                    <input type="text" placeholder="First Name" value={first_name} onChange={e => set_first_name(e.target.value)}/>
                    <input type="text" placeholder="Last Name" value={last_name} onChange={e => set_last_name(e.target.value)}/>
                </div>

                <input type="text" placeholder="Company (Optional)" value={company} onChange={e => set_company(e.target.value)}/>
                <input type="text" placeholder="Address" value={address} onChange={e => set_address(e.target.value)}/>
                <input type="text" placeholder="Apartment, suite, etc. (Optional)" value={apartment} onChange={e => set_apartment(e.target.value)}/>
                <input type="text" placeholder="City" value={city} onChange={e => set_city(e.target.value)}/>
                <input type="text" placeholder="Post code" value={post_code} onChange={e => set_post_code(e.target.value)}/>
                <input type="text" placeholder="Phone" value={phone} onChange={e => set_phone(e.target.value)}/>
            </div>

            <div className="shopping-cart-container">
                {
                    count > 0?
                        <Fragment>
                            <h2>Your Cart</h2>

                            <hr/>

                            {
                                shopping_list.map(item_data => <CartItem key={item_data.id} data={item_data}/>)
                            }

                            <hr/>
                            <h2 className="subtotal">Subtotal: ${numberWithCommas(total)}</h2>

                            <hr/>

                            <div className="card-data-container">
                                <i className="far fa-credit-card"/> Card fields here...
                            </div>

                            {
                                error&& <div className="checkout-error">{error}</div>
                            }

                            <button onClick={check_out_action}><i className="far fa-credit-card"/> Check out</button>

                        </Fragment>
                        :
                        <Fragment>
                            <h2>YOUR CART IS CURRENTLY EMPTY.</h2>
                        </Fragment>
                }
            </div>
        </div>
    );
}

export default CheckoutPage;