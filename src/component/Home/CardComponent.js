import React from 'react';
import { connect } from 'react-redux';
import './home.css';


const stateCardComponent = (state) => {
    return { state : state };
};

const CardComponentConnect = ({state}) => {
    return (
        <section class="phraseSection">
            <div class="item item_perspective-inverse">
                <div class="item_content-wrapper">
                    <div class="availability">
                        <p className='phraseParagraphe'>{state.SelectDay.phrase}</p>
                        <img src={state.SelectDay.image} className='imageHome' alt="Logo" />
                    </div>
                </div>
            </div>
        </section>    
    );
}

const CardComponent = connect(stateCardComponent)(CardComponentConnect)

export default CardComponent




