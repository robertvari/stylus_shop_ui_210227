import React from 'react';
import {Link} from "react-router-dom";

function SignInPage(props) {
    return (
        <div className="center-page-container">
            <form>
                <h1>Sign In</h1>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>

                <Link style={{textAlign: "center"}} to="/password-reset"><small>Forgot your password?</small></Link>

                <button>Sign In</button>

                <small style={{textAlign: "center"}}>or <Link to="/">Return to Store</Link></small>
            </form>
        </div>
    );
}

export default SignInPage;