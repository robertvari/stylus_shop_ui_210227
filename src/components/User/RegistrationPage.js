import React from 'react';
import {Link} from "react-router-dom";

function RegistrationPage(props) {
    return (
        <div className="center-page-container">
            <form>
                <h1>CREATE ACCOUNT</h1>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>

                <button>CREATE</button>

                <small>or <Link to="/">Return to store</Link></small>
            </form>
        </div>
    );
}

export default RegistrationPage;