import React from 'react';
import { connect } from 'react-redux';
import '../home.css';
import './styles.css';

const stateCardComponent = (state) => {
    return { state : state };
};

const CardComponentConnect = ({state}) => {
    function displayImg() {
        if (state.ImageCarrouselContent1.image === null) {
            return(<img src="https://pbs.twimg.com/profile_images/1139094127130402821/dbboP5Op_400x400.png" alt="" style={{width: '100vh',height:'100vh',margin: 'auto'}}/>)
        }else{
            return(<img src={state.ImageCarrouselContent1.image} alt=''    style={{width: '100vh',height:'100vh',margin: 'auto'}} />)
        }
    }
    return (
        <section className="content bloc">
        <q>{state.ImageCarrouselContent1.phrase}</q>
        <br/>
        {displayImg()}
      </section> 
    );
}

const CardComponent = connect(stateCardComponent)(CardComponentConnect)

export default CardComponent




