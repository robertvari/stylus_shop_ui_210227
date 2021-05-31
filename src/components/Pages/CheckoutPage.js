import React, {Fragment, useContext, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import CartItem from "../ShoppingCart/CartItem";
import {ShoppingCartContext} from "../contexts/ShoppingCartContext";
import {UserContext} from "../contexts/UserContext";
import axios from "axios";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import StripeForm from "./StripeForm";


const API_URL = process.env.REACT_APP_API_URL
const stripePromise = loadStripe('pk_test_51HyehYF9rSH7raBvQsbdg02wPMcRm0RtwPGOxBNlB0BNRdzAQIpSeptP48fGtvNBQDAwckdPkJzTMQUPFrlYWkH500JF4oGXW5');



function CheckoutPage(props) {
    const history = useHistory()

    const {count, shopping_list, total} = useContext(ShoppingCartContext)
    const {
        first_name,
        set_first_name,
        last_name,
        set_last_name,
        company,
        set_company,
        address,
        set_address,
        apartment,
        set_apartment,
        city,
        set_city,
        post_code,
        set_post_code,
        phone,
        set_phone,
        logged_in,
        email,
        set_email,
        user_id
    } = useContext(UserContext)

    const [error, set_error] = useState(null)


    const _set_error = (message) => {
        set_error(message)
        setTimeout(() => {set_error(null)}, 5000)
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

    const check_out_action = async () => {
        if(!check_errors()) return

        const res = await axios({
            method: "post",
            url: `${API_URL}/api/shop/order/`,
            data: {
                payment_id: 12345,
                amount: total * 100,
                shopping_list: shopping_list,

                customer: {
                    user_id: user_id,
                    email: email,
                    first_name: first_name,
                    last_name: last_name,
                    company:company,
                    address: address,
                    apartment: apartment,
                    city: city,
                    post_code: post_code,
                    phone:phone
                }
            }
        })

        if(res.data.status === "succeeded"){
            history.push("/payment_success")
        }
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="checkout-container">
            <div className="personal-data-container">
                <h2>Contact information</h2>
                <hr/>

                {
                    !logged_in&& <small>Already have an account? <Link to="/login">Log in</Link></small>
                }

                <input type="email" placeholder="Email" value={email} onChange={e => set_email(e.target.value)}/>

                <hr/>
                <h2>Shipping Address</h2>
                <div className="name-container">
                    <input type="text" placeholder="Fist name" value={first_name} onChange={e => set_first_name(e.target.value)}/>
                    <input type="text" placeholder="Last name" value={last_name} onChange={e => set_last_name(e.target.value)}/>
                </div>

                <input type="text" placeholder="Company (optional)" value={company} onChange={e => set_company(e.target.value)}/>
                <input type="text" placeholder="Address" value={address} onChange={e => set_address(e.target.value)}/>
                <input type="text" placeholder="Apartment, suite, etc. (optional)" value={apartment} onChange={e => set_apartment(e.target.value)}/>
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
                                <Elements stripe={stripePromise}>
                                  <StripeForm />
                                </Elements>
                            </div>

                            {
                                error&& <div className="checkout-error">{error}</div>
                            }

                        </Fragment>
                        :
                        <Fragment>
                            <h2>YOUR CART IS CURRENTLY EMPTY.</h2>
                            <small>Continue browsing <Link to={"/"}>here.</Link></small>
                        </Fragment>
                }
            </div>
        </div>
    );
}

export default CheckoutPage;