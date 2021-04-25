import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom"
import axios from "axios";
import ItemCard from "../Home/ItemCard";

const API_URL = process.env.REACT_APP_API_URL

function ItemListPage(props) {
    const {category} = useParams()
    const {subcategory} = useParams()
    const [items, set_items] = useState([])

    const fetch = () => {
        axios({
            method: "get",
            url: `${API_URL}/items`
        })
            .then(res => set_items(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <div className="item-list-container">
            <div className="item-grid">
                {
                    items.filter(
                        data => subcategory?
                            data.category === category && data.subcategory === subcategory
                            :
                            data.category === category
                    ).map(data => <ItemCard key={data.id} data={data}/>)
                }
            </div>
        </div>
    );
}

export default ItemListPage;