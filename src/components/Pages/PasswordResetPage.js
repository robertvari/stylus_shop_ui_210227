import React from 'react';
import {Link} from "react-router-dom";

function PasswordResetPage(props) {
    return (
        <div className="center-page-container">
            <form>
                <h1>RESET YOUR PASSWORD</h1>
                <small>We will send you an email to reset your password.</small>
                <input type="email" placeholder="Email"/>

                <button>SUBMIT</button>

                <small>or <Link to="/">Return to store</Link></small>
            </form>
        </div>
    );
}

export default PasswordResetPage;