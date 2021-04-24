import React from 'react';
import Slider from "./Slider";
import Categories from "./Categories";
import FeaturedList from "./FeaturedList";
import AnalogList from "./AnalogList";

function Home(props) {
    return (
        <div>
            <Slider/>

            <hr/>

            <Categories/>

            <hr/>

            <FeaturedList/>

            <hr/>

            <AnalogList/>
        </div>
    );
}

export default Home;