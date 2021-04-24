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

    const step_action = (value) => {
        let _index = current_index
        _index += value
        if(_index > image_list.length -1){
            _index = 0
        }else if (_index < 0){
            _index = image_list.length -1
        }

        set_current_index(_index)
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <div className="slider-container">
            <div className="image-container">
                {
                    image_list.map((data, index) => <img className={`slider-image ${current_index === index? "active":""}`} src={data.image} alt=""/>)
                }
            </div>

            <div className="step-button-container">
                <i className="fas fa-chevron-left" onClick={() => step_action(-1)}/>
                <i className="fas fa-chevron-right" onClick={() => step_action(1)}/>
            </div>

            <div className="step-circles-container">
                {
                    image_list.map((data, index) => <i className={`fas fa-circle ${current_index === index? "active":""}`} onClick={()=> set_current_index(index)}/> )
                }
            </div>

        </div>
    );
}

export default Slider;