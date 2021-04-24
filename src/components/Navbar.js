import React from 'react';

function Navbar(props) {
    return (
        <div className="navbar-container">

            <div className="content">

                <small className="sign-in-container">Sign in or Create an Account</small>

                <div className="search-container">
                    <h1>Stylus Shop</h1>

                    <input type="text" placeholder="Search all products..."/>
                    <button><i className="fas fa-shopping-cart"/> CART</button>
                </div>

                <div>
                    menu...
                </div>

            </div>

        </div>
    );
}

export default Navbar;