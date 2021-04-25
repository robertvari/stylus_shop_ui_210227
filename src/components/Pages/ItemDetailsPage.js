import React from 'react';
import {useParams} from "react-router-dom";

function ItemDetailsPage(props) {
    const {id} = useParams()

    return (
        <h1>Details Page: {id}</h1>
    );
}

export default ItemDetailsPage;