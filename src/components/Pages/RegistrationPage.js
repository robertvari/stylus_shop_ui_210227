import React from 'react';
import {Link} from "react-router-dom";

function RegistrationPage(props) {
    const registration_handler = (e) => {
        e.preventDefault()
    }

    return (
        <div className="center-page-container">
            <form>
                <h1>CREATE ACCOUNT</h1>
                <hr/>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>

                <button onClick={registration_handler}>CREATE</button>

                <small style={{textAlign: "center"}}>or <Link to="/">Return to Store</Link></small>
            </form>
        </div>
    );
}

export default RegistrationPage;