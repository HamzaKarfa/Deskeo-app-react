import React from 'react';
import './style.css';


const MultipleFullScreenImage = (props) => {
    return (
        <section class="contentMIFS">
            {Object.keys(props.Element.ArrayImage).map((key)=> 
                <img src={props.Element.ArrayImage[key]} className='imageHome' alt="Logo" />
            )}
        </section>    
    );
}


export default MultipleFullScreenImage




