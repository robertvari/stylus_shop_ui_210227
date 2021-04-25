import React from 'react';

function ItemCard({data}) {
    return (
        <div className="card item-card">
            <img src={data.image} alt=""/>
            <small>{data.summary}</small>
            <div className="price">{data.price}</div>
        </div>
    );
}

export default ItemCard;