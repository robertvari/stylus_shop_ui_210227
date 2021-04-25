import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom"
import axios from "axios";

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
            {
                items.filter(
                    data => subcategory?
                        data.category === category && data.subcategory === subcategory
                        :
                        data.category === category
                ).map(data => <div>{data.title}</div>)
            }
        </div>
    );
}

export default ItemListPage;