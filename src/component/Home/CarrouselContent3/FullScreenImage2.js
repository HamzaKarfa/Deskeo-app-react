import React from 'react';
import { connect } from 'react-redux';
import '../home.css';

const stateFullScreenImage = (state) => {
    return { state : state };
};

const FullScreenImageConnect = ({state}) => {
    return (
        <section class="contentfull">
            {Object.keys(state.ImageCarrouselContent3).map((key)=> 
                <img src={state.ImageCarrouselContent3[key]} className='imageHome' alt="Logo" style={{height:'250px'}} />
            )}
        </section>    
    );
}

const FullScreenImage = connect(stateFullScreenImage)(FullScreenImageConnect)

export default FullScreenImage




