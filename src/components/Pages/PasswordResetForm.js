import React from 'react';
import {Link, useParams} from "react-router-dom";

function PasswordResetForm(props) {
    const {uid} = useParams()
    const {token} = useParams()

    const reset_handler = (e) => {
        e.preventDefault()
    }

    return (
        <div className="center-page-container">
            <form>
                <h1>RESET PASSWORD</h1>
                <hr/>
                <input type="password1" placeholder="New Password"/>
                <input type="password2" placeholder="Confirm Password"/>

                <button onClick={reset_handler}>RESET</button>

                <small style={{textAlign: "center"}}>or <Link to="/">Return to Store</Link></small>
            </form>
        </div>
    );
}

export default PasswordResetForm;