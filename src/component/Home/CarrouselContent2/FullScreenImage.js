import React from 'react';
import { connect } from 'react-redux';
import '../home.css';

const stateFullScreenImage = (state) => {
    return { state : state };
};

const FullScreenImageConnect = ({state}) => {
    function displayImg() {
        if (state.ImageCarrouselContent2.image === null) {
            return(<img src="https://pbs.twimg.com/profile_images/1139094127130402821/dbboP5Op_400x400.png" alt="" />)
        }else{
            return(<img src={state.ImageCarrouselContent2.image} alt="" />)
        }
    }
    return (
        <section class="contentfull">
            {displayImg()}
        </section>    
    );
}

const FullScreenImage = connect(stateFullScreenImage)(FullScreenImageConnect)

export default FullScreenImage




