import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "./contexts/UserContext";
import {Route, Redirect} from "react-router-dom"


function ProtectedRoute({component: Component, ...rest}) {
    const {logged_in, check_token} = useContext(UserContext)
    const [loading, set_loading] = useState(true)

    useEffect(() => {
        check_token()
        set_loading(false)
    }, [])

    if(loading){
        return null
    }

    return (
        <Route {...rest} render={
            props => {
                if(logged_in){
                    return <Component {...props}/>
                }else{
                    return <Redirect to={"/login"}/>
                }
            }
        }/>
    );
}

export default ProtectedRoute;