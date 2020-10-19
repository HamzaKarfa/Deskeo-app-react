import React from 'react';
import './style.css';


const FullScreenImage = (props) => {
    function displayImg() {
        if (props.Element.imageFullscreen === null) {
            return(<img src="https://pbs.twimg.com/profile_images/1139094127130402821/dbboP5Op_400x400.png" alt="" />)
        }else{
            return(<img src={props.Element.imageFullscreen} alt="" />)
        }
    }
    return (
        <section class="contentIFS">
            {displayImg()}
        </section>    
    );
}

export default FullScreenImage




