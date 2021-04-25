import React from 'react';

function ShoppingCart(props) {
    return (
        <div className="cart-container">
            <div className="card">
                <i className="far fa-times-circle close-icon"/>
                <h1>Shopping Cart</h1>
                <hr/>
                <div>Items...</div>
                <hr/>
                <h2 className="subtotal">Subtotal: $160</h2>

                <button><i className="fas fa-shopping-cart"/> CHECK OUT</button>
            </div>
        </div>
    );
}

export default ShoppingCart;