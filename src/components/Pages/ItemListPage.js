import React from 'react';
import {useParams} from "react-router-dom"

function ItemListPage(props) {
    const {category} = useParams()
    const {subcategory} = useParams()

    return (
        <div>
            <h1>{category}</h1>
            <h2>{subcategory}</h2>
        </div>
    );
}

export default ItemListPage;