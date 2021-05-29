import React, {useContext, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {UserContext} from "../contexts/UserContext";

function RegistrationPage(props) {
    const {register_user} = useContext(UserContext)
    const [email, set_email] = useState("")
    const [password1, set_password1] = useState("")
    const [password2, set_password2] = useState("")
    const [error, set_error] = useState(null)
    const [waiting, set_waiting] = useState(false)
    const history = useHistory();

    const registration_handler = async (e) => {
        e.preventDefault()
        set_error(null)

        if(email.length === 0){
            set_error("Email is invalid")
            return
        }

        if(password1.length === 0){
            set_error("Password is invalid")
            return
        }

        if(password1 !== password2){
            set_error("Passwords not match.")
            return
        }

        set_waiting(true)

        let result = await register_user(email, password1)

        set_waiting(false)

        if(!result){
            set_error("This user already registered")
            return
        }

        history.push("/registration-email-sent")
    }

    return (
        <div className="center-page-container">
            <form>
                <h1>CREATE ACCOUNT</h1>
                <input type="email" placeholder="Email" value={email} onChange={e => set_email(e.target.value)}/>
                <input type="password" placeholder="Password" value={password1} onChange={e => set_password1(e.target.value)}/>
                <input type="password" placeholder="Confirm your password" value={password2} onChange={e => set_password2(e.target.value)}/>

                {
                    error&& <div className="error">{error}</div>
                }

                {
                    waiting? <div>Waiting...</div>: <button onClick={registration_handler}>CREATE</button>
                }


                <small>or <Link to="/">Return to store</Link></small>
            </form>
        </div>
    );
}

export default RegistrationPage;