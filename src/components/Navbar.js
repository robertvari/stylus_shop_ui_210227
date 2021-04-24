import React, {useState, useEffect} from 'react';
import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL


function SearchField(props) {
    return(
        <input type="text" placeholder="Search all products..."/>
    )
}

function CartButton(props){
    return(
        <button><i className="fas fa-shopping-cart"/> CART</button>
    )
}

function MenuItem({title, items}) {
    return(
        <div>
            {title}

            {
                items&& <div className="popup-menu">
                    {
                        items.map(item_data => <small key={item_data}>{item_data}</small>)
                    }
                </div>
            }
        </div>
    )
}

function Menu(props) {
    const [menu_list, set_menu_list] = useState()

    const fetch = () => {
        axios({
            method: "get",
            url: `${API_URL}/categories`
        })
            .then(res => set_menu_list(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <div>
            {
                menu_list.map(menu_data => <MenuItem key={menu_data.id} title={menu_data.title} items={menu_data.items}/>)
            }
        </div>
    )
}



function Navbar(props) {
    const [site_info, set_site_info] = useState({})

    const fetch = () => {
        axios({
            method: "get",
            url: `${API_URL}/site_info`
        })
            .then(res => set_site_info(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <div className="navbar-container">

            <div className="content">

                <small className="sign-in-container">Sign in or Create an Account</small>

                <div className="search-container">
                    <h1>{site_info.name}</h1>

                    <SearchField/>
                    <CartButton/>
                </div>

                <Menu/>

            </div>

        </div>
    );
}

export default Navbar;