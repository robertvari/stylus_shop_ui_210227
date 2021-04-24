import React, {useState, useEffect} from 'react';
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

function Slider(props) {
    const [image_list, set_image_list] = useState([])
    const [current_index, set_current_index] = useState(0)

    const fetch = () => {
        axios({
            method: "get",
            url: `${API_URL}/slider`
        })
            .then(res => set_image_list(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <div className="slider-container">
            <div className="image-container">
                {
                    image_list.map(data => <img className={"slider-image"} src={data.image} alt=""/>)
                }
            </div>

            <div className="step-button-container">
                <i className="fas fa-chevron-left"/>
                <i className="fas fa-chevron-right"/>
            </div>

            <div className="step-circles-container">
                {
                    image_list.map(data => <i className={"fas fa-circle"}/> )
                }
            </div>

        </div>
    );
}

export default Slider;