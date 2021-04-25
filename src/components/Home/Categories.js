import React, {useEffect, useState} from 'react';
import axios from "axios"
import {Link} from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL

function CategoryCard({data}){
    return(
        <Link to={`/categories/${data.title}`} className={"card"}>
            <img src={data.image} alt=""/>
            {data.title}
        </Link>
    )
}


function Categories(props) {
    const [categories, set_categories] = useState([])

    const fetch = () => {
        axios({
            method: "get",
            url: `${API_URL}/categories`
        })
            .then(res => set_categories(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <div className="home-collection-container">
            <h4>Shop For</h4>
            <div className="cards-container">
                {
                    categories.map(data => <CategoryCard key={data.id} data={data}/>)
                }
            </div>
        </div>
    );
}

export default Categories;