import React, {Fragment, useContext} from 'react';
import {Link} from "react-router-dom";
import CartItem from "../ShoppingCart/CartItem";
import {ShoppingCartContext} from "../contexts/ShoppingCartContext";

function CheckoutPage(props) {
    const {count, shopping_list, total} = useContext(ShoppingCartContext)

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="checkout-container">
            <div className="personal-data-container">
                <h2>Contact information</h2>
                <hr/>
                <small>Already have an account? <Link to="/login">Log in</Link></small>

                <input type="email" placeholder="Email"/>

                <hr/>
                <h2>Shipping Address</h2>
                <div className="name-container">
                    <input type="text" placeholder="Fist name"/>
                    <input type="text" placeholder="Last name"/>
                </div>

                <input type="text" placeholder="Company (optional)"/>
                <input type="text" placeholder="Address"/>
                <input type="text" placeholder="Apartment, suite, etc. (optional)"/>
                <input type="text" placeholder="City"/>
                <input type="text" placeholder="Post code"/>
                <input type="text" placeholder="Phone"/>
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
                                <i className="far fa-credit-card"/> Card Fielrs...
                            </div>

                            <button><i className="far fa-credit-card"/> Check Out</button>

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