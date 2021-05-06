import React from 'react';
import {Link} from "react-router-dom";

function PasswordResetPage(props) {
    const submit_handler = (e) => {
        e.preventDefault()
    }

    return (
        <div className="center-page-container">
            <form>
                <h1>RESET YOUR PASSWORD</h1>
                <hr/>
                <small>We will send you an email to reset your password.</small>
                <input type="email" placeholder="Email"/>

                <button onClick={submit_handler}>SUBMIT</button>

                <small style={{textAlign: "center"}}>or <Link to={"/"}>Cancel</Link></small>
            </form>
        </div>
    );
}

export default PasswordResetPage;