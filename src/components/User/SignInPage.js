import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {UserContext} from "../contexts/UserContext";

function SignInPage(props) {
    const {log_in_user} = useContext(UserContext)
    const [email, set_email] = useState("")
    const [password, set_password] = useState("")

    const log_in_action = (e) => {
        e.preventDefault()

        if(!email && !password) return
        log_in_user(email, password)
    }

    useEffect(() => {
        if(process.env.NODE_ENV === "development"){
            set_email("robert@gmail.com")
            set_password("testpas123")
        }
    }, [])

    return (
        <div className="center-page-container">
            <form>
                <h1>Sign In</h1>
                <input type="email" placeholder="Email" value={email} onChange={e => set_email(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={e => set_password(e.target.value)}/>

                <Link to="/password-reset"><small>Forgot your password?</small></Link>

                <button onClick={log_in_action}>Sign In</button>

                <small>or <Link to="/">Return to store</Link></small>
            </form>
        </div>
    );
}

export default SignInPage;