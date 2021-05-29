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

    const [email, set_email] = useState("")
    const [first_name, set_first_name] = useState("")
    const [last_name, set_last_name] = useState("")
    const [company, set_company] = useState("")
    const [address, set_address] = useState("")
    const [apartment, set_apartment] = useState("")
    const [city, set_city] = useState("")
    const [post_code, set_post_code] = useState("")
    const [phone, set_phone] = useState("")


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

    const fetch_profile = () => {
        axios({
            method: "get",
            url: `${API_URL}/api/users/profile/`,
            headers: {
                authorization: `token ${token}`
            }
        }).then(res => {
            let profile_data = res.data.profile
            set_email(res.data.email)
            set_first_name(profile_data.first_name)
            set_last_name(profile_data.last_name)
            set_company(profile_data.company)
            set_address(profile_data.address)
            set_apartment(profile_data.apartment)
            set_city(profile_data.city)
            set_post_code(profile_data.post_code)
            set_phone(profile_data.phone)
        })
    }

    const update_profile = async () => {
        await axios({
            method: "patch",
            url: `${API_URL}/api/users/profile/`,
            headers: {
                authorization: `token ${token}`
            },
            data:{
                first_name: first_name,
                last_name: last_name,
                company: company,
                address: address,
                apartment: apartment,
                city: city,
                post_code: post_code,
                phone: phone
            }
        })
    }

    useEffect(() => {
        check_token()
    })

    useEffect(() => {
        if(logged_in){
            fetch_profile()
        }
    }, [logged_in])

    return(
        <UserContext.Provider value={{
            log_in_user: log_in_user,
            logged_in: logged_in,
            token: token,
            user_data: user_data,
            check_token: check_token,
            log_out_user: log_out_user,
            register_user: register_user,

            email: email,
            set_email:set_email,

            first_name: first_name,
            set_first_name: set_first_name,
            last_name: last_name,
            set_last_name: set_last_name,
            company: company,
            set_company: set_company,
            address: address,
            set_address: set_address,
            apartment: apartment,
            set_apartment: set_apartment,
            city: city,
            set_city: set_city,
            post_code: post_code,
            set_post_code: set_post_code,
            phone: phone,
            set_phone: set_phone,
            update_profile: update_profile
        }}>
            {props.children}
        </UserContext.Provider>
    )
}