import React, {useContext, Fragment} from 'react';
import {ShoppingCartContext} from "../contexts/ShoppingCartContext";
import {Link} from "react-router-dom";
import CartItem from "./CartItem";


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

                            <Link to={"/checkout"}>
                                <button onClick={() => set_visible(false)}><i className="fas fa-shopping-cart"/> CHECK OUT</button>
                            </Link>

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