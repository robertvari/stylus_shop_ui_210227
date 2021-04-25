import React from 'react';
import {Link} from "react-router-dom";

function ItemCard({data}) {
    return (
        <Link to={`/details/${data.id}`} className="card item-card">
            <img src={data.image} alt=""/>
            <small>{data.title}</small>
            <div className="price">{data.price}</div>
        </Link>
    );
}

export default ItemCard;