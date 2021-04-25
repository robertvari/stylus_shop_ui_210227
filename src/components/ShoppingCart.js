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
    const {visible, set_visible} = useContext(ShoppingCartContext)

    if(!visible) return null

    return (
        <div className="cart-container" onClick={() => set_visible(false)}>

            <div className="card" onClick={e => e.stopPropagation()}>
                <i className="far fa-times-circle close-icon" onClick={() => set_visible(false)}/>
                <h2>Shopping Cart</h2>

                <hr/>

                <hr/>
                <h2 className="subtotal">Subtotal: $160</h2>

                <button onClick={() => set_visible(false)}><i className="fas fa-shopping-cart"/> CHECK OUT</button>
            </div>
        </div>
    );
}

export default ShoppingCart;