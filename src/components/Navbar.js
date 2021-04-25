import React, {useState, useEffect, useContext} from 'react';
import axios from "axios"
import {Link} from "react-router-dom";
import {ShoppingCartContext} from "./contexts/ShoppingCartContext";

const API_URL = process.env.REACT_APP_API_URL


function SearchField(props) {
    return(
        <input type="text" placeholder="Search all products..."/>
    )
}

function CartButton(props){
    const {set_visible, count} = useContext(ShoppingCartContext)

    return(
        <button onClick={() => set_visible(true)}>
            <i className="fas fa-shopping-cart"/> CART

            {
                count>0&& <div className="item-counter">{count}</div>
            }

        </button>
    )
}

function MenuItem({title, items}) {
    return(
        <div className="menu-item">
            <Link to={`/categories/${title}`}>
                {title.toUpperCase()}

                {
                    items&& <i className="fas fa-caret-down"/>
                }
            </Link>

            {
                items&& <div className="popup-menu">
                    {
                        items.map(item_data => <Link to={`/categories/${title}/${item_data}`} key={item_data} className="menu-item">{item_data}</Link>)
                    }
                </div>
            }
        </div>
    )
}

function Menu(props) {
    const [menu_list, set_menu_list] = useState([])

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
        <div className="menu-container">
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

                <small className="sign-in-container"><Link to="/login">Sign</Link> in or <Link to="/registration">Create an Account</Link></small>

                <div className="search-container">
                    <Link to="/"><h1>{site_info.name}</h1></Link>

                    <div>
                        <SearchField/>
                        <CartButton/>
                    </div>

                </div>

                <Menu/>

            </div>

        </div>
    );
}

export default Navbar;