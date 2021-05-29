import React, {useState, createContext, useEffect} from "react"
import {useCookies} from "react-cookie";
import axios from "axios";
import {sleep} from "../../utilities";

const API_URL = process.env.REACT_APP_API_URL

export const UserContext = createContext(true)

export const UserProvider = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies()

    const [logged_in, set_logged_in] = useState(false)
    const [user_data, set_user_data] = useState({"profile_url":"robert"})
    const [token, set_token] = useState(null)

    const check_token = () => {
        if(cookies.token){
            set_logged_in(true)
            set_token(cookies.token)
        }
    }

    const log_in_user = async (email, password) => {
        await axios({
            method: "post",
            url: `${API_URL}/auth/login/`,
            data: {
                email: email,
                password:password
            }
        })
            .then(res =>{
                    set_token(res.data.key)
                    setCookie('token', res.data.key, {path:'/', sameSite:'strict', maxAge:86400})
                }
            )
            .catch(error => {
                console.log(error.response.status)
            })
    }


    const register_user = async (email, password) => {
        try{
            const result = await axios({
                method: "post",
                url: `${API_URL}/auth/registration/`,
                data: {
                    email: email,
                    password1: password,
                    password2: password
                }
            })

            return result.status === 201;

        }catch (err){
            return false
        }
    }

    const log_out_user = async () => {
        await axios({
            method: "post",
            url: `${API_URL}/auth/logout/`,
            headers:{
                authorization: `token ${token}`
            }
        }).then(res => {
                removeCookie("token", {path: "/"})
                set_logged_in(false)
                set_token(null)
            }
        ).catch( error => {
                console.log(error)
            }
        )
    }


    useEffect(() => {
        check_token()
    })

    return(
        <UserContext.Provider value={{
            log_in_user: log_in_user,
            logged_in: logged_in,
            token: token,
            user_data: user_data,
            check_token: check_token,
            log_out_user: log_out_user,
            register_user: register_user
        }}>
            {props.children}
        </UserContext.Provider>
    )
}