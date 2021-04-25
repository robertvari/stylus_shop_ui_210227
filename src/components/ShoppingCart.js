import React, {useContext, useState, Fragment} from 'react';
import {ShoppingCartContext} from "./contexts/ShoppingCartContext";
import {Link} from "react-router-dom";

function CartItem({data}){
    const {remove_from_cart} = useContext(ShoppingCartContext)

    return(
        <div className="cart-item-container">
            <img src={data.image} alt=""/>
            <small>{data.title}</small>
            <div>{data.quantity} x</div>
            <h4>{data.price}</h4>

            <i className="far fa-times-circle close-icon" onClick={()=>remove_from_cart(data.id)}/>
        </div>
    )
}


function ShoppingCart(props) {
    const {visible, set_visible, count, shopping_list, total} = useContext(ShoppingCartContext)

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    if(!visible) return null

    return (
        <div className="cart-container" onClick={() => set_visible(false)}>

            <div className="card" onClick={e => e.stopPropagation()}>

                {
                    count > 0?
                        <Fragment>
                            <i className="far fa-times-circle close-icon" onClick={() => set_visible(false)}/>
                            <h2>Shopping Cart</h2>

                            <hr/>

                            {
                                shopping_list.map(item_data => <CartItem key={item_data.id} data={item_data}/>)
                            }

                            <hr/>
                            <h2 className="subtotal">Subtotal: ${numberWithCommas(total)}</h2>

                            <button onClick={() => set_visible(false)}><i className="fas fa-shopping-cart"/> CHECK OUT</button>
                        </Fragment>
                        :
                        <Fragment>
                            <h2>YOUR CART IS CURRENTLY EMPTY.</h2>
                            <small>Continue browsing <Link to={"/"} onClick={() => set_visible(false)}>here.</Link></small>
                        </Fragment>
                }
            </div>
        </div>
    );
}

export default ShoppingCart;