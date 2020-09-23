import React from 'react';
import { connect } from 'react-redux';
import './home.css';

const stateCardComponent = (state) => {
    return { state : state };
};

const CardComponentConnect = ({state}) => {
    function displayImg() {
        if (state.SelectDay.image === null) {
            return(<img src="http://www.deskeo.fr/wp-content/uploads/2019/05/logo-deskeo-knotel-black-164.png" className='imageHome' alt="Logo" style={{height:'150px'}} />)
        }else{
            return(<img src={state.SelectDay.image} className='imageHome' alt="Logo" style={{height:'250px'}} />)
        }
    }
    return (
        <section class="phraseSection">
            <div class="item item_perspective-inverse">
                <div class="item_content-wrapper">
                    <div class="availability">
                        <p className='phraseParagraphe'>{state.SelectDay.phrase}</p>
                        {displayImg()}
                    </div>
                </div>
            </div>
        </section>    
    );
}

const CardComponent = connect(stateCardComponent)(CardComponentConnect)

export default CardComponent




