import React, {useContext, useState} from 'react';
import {ShoppingCartContext} from "./contexts/ShoppingCartContext";

function CartItem({data}){
    return(
        <div className="cart-item-container">
            <img src={data.image} alt=""/>
            <small>{data.title}</small>
            <div>{data.quantity} x</div>
            <h4>{data.price}</h4>
            <i className="far fa-times-circle close-icon"/>
        </div>
    )
}


function ShoppingCart(props) {
    // if(!visible) return null
    const {my_name, set_my_name} = useContext(ShoppingCartContext)

    return (
        <div className="cart-container">
            <div className="card">
                <i className="far fa-times-circle close-icon"/>
                <h2>Shopping Cart</h2>

                <h1>{my_name}</h1>

                <hr/>

                <hr/>
                <h2 className="subtotal">Subtotal: $160</h2>

                <button onClick={() => set_my_name("Csaba")}><i className="fas fa-shopping-cart"/> CHECK OUT</button>
            </div>
        </div>
    );
}

export default ShoppingCart;