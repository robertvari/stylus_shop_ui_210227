import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {ShoppingCartContext} from "../contexts/ShoppingCartContext";

const API_URL = process.env.REACT_APP_API_URL

function Image({data}) {
    return(
        <div>
            <img src={data.image} alt=""/>
        </div>
    )
}

function Buttons({item_data}) {
    const {add_to_cart} = useContext(ShoppingCartContext)

    return (
        <div className="buttons-layout">
            <button className="inverted" onClick={() => add_to_cart(item_data)}><i className="fas fa-shopping-cart"/> ADD TO CART</button>
            <button>BUY IT NOW</button>
        </div>
    )
}

function ItemDetailsPage(props) {
    const {id} = useParams()
    const [item_data, set_item_data] = useState({})

    const fetch = () => {
        axios({
            method: "get",
            url: `${API_URL}/items/${id}`
        }).then(res => set_item_data(res.data))
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <div className="details-container">
            <Image data={item_data}/>

            <div>
                <h3 className="item-title">{item_data.title}</h3>
                <h4 className="price">{item_data.price}</h4>

                 <hr/>

                <Buttons item_data={item_data}/>

                <hr/>

                <p>{item_data.description}</p>
            </div>
        </div>
    );
}

export default ItemDetailsPage;