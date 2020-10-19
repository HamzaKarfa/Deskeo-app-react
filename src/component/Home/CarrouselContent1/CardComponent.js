import React from 'react';
import './styles.css';


const CardComponent = (props) => {
    function displayImg() {
        if (props.Element.image === null) {
            return(<img src="https://pbs.twimg.com/profile_images/1139094127130402821/dbboP5Op_400x400.png" alt="" className="imgPDJ"/>)
        }else{
            return(<img src={props.Element.image} alt='' className="imgPDJ" />)
        }
    }
    return (
        <section className="contentPDJ ">
            <q className="phrasePDJ">{props.Element.phrase}</q>
            <br/>
            {displayImg()}
      </section> 
    );
}


export default CardComponent




