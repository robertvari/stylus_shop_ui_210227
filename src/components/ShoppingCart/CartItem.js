import React, {useContext, Fragment} from 'react';
import {ShoppingCartContext} from "../contexts/ShoppingCartContext";


function Quantity({quantity, itemID}) {
    const {set_quantity} = useContext(ShoppingCartContext)

    return(
        <div className="quantity-container">
            <i className="far fa-minus-square" onClick={()=> set_quantity(itemID, -1)}/>
            <div className="quantity">{quantity}</div>
            <i className="far fa-plus-square" onClick={()=> set_quantity(itemID, 1)}/>
        </div>
    )
}

function CartItem({data}){
    const {remove_from_cart} = useContext(ShoppingCartContext)

    return(
        <div className="cart-item-container">
            <img src={data.image} alt=""/>
            <small>{data.title}</small>
            <Quantity quantity={data.quantity} itemID={data.id}/>
            <h4>{data.price}</h4>

            <i className="far fa-times-circle close-icon" onClick={()=>remove_from_cart(data.id)}/>
        </div>
    )
}

export default CartItem;