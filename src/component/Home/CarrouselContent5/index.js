import React, { useEffect, useState } from "react";
import { fetchRooms } from "./deskeo";
import "./stylesContent5.css";
import { connect } from 'react-redux';
import { setRoom } from "../../../action";
import { setLoading } from "../../../action";
import { setIdle } from "../../../action";
const stateSDRMeteo = (state) => {
    return { state : state };
};
const dispatchSDRMeteo =(dispatch,state) =>{
    return {
        setRooms: (e) => { dispatch(setRoom(e)) },
        setLoadings:(e)=>{ dispatch(setLoading(e)) },
        setIdles:(e)=>{ dispatch(setIdle(e)) }
      }
   };
function SDRMeteoConnect ({state, setRooms, setLoadings,setIdles}) {
    // const [rooms, setRooms] = useState({});
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});
    // const [idle, setIdle] = useState(false);

    useEffect(() => {

        if (!state.SDR.idle) {
            
            (async _ => {
                try {
                    const today = new Date();
                    const tomorrow = new Date();
                    tomorrow.setDate(today.getDate() + 1);

                    setRooms(
                        await fetchRooms(
                            {
                            start: today.toJSON().slice(0, 10),
                            end: tomorrow.toJSON().slice(0, 10)
                            },
                            _ => setLoading(false)
                        )
                    );

                } catch (error) {
                    setError(error);
                    setLoadings(false);
                    throw error;
                }
            })();
            setIdles(true);
        }
    }, 
    [state.SDR.idle],
    );
    function displayPlaceNumber(roomName){
        if (roomName === 'Lyon - le Bouchon') {
            return '4'
        } else if (roomName === 'Lyon - Salle de réunion - 411' ) {
            return '8'
        } else if (roomName === 'Lyon - Salle de réunion - 502' ) {
            return '8'
        }else{
            return '30'
        }
    }
    function displayColor(roomName){
        if (roomName === 'Lyon - le Bouchon') {
            return "rgb(41, 185, 150)"
        } else if (roomName === 'Lyon - Salle de réunion - 411' ) {
            return "rgb(255, 94, 77)"
        } else if (roomName === 'Lyon - Salle de réunion - 502' ) {
            return "rgb(224, 218, 34)"
        }else{
            return "rgb(23, 102, 185)"
        }
    }
    function displayRoomList(){
        if (state.SDR.rooms === undefined) {
            
        } else { 
            return (
                Object.keys(state.SDR.rooms).map(roomId => {
                    return (
                    <div class="item">
                    <div class="item_content-wrapper">
                        <h1>{state.SDR.rooms[roomId].room.name}</h1>
                        <div class="availability">
                        <p style={{color:displayColor(state.SDR.rooms[roomId].room.name)}}>{displayPlaceNumber(state.SDR.rooms[roomId].room.name)} personnes</p>
                        <p>de 9h à 11h 30</p>
                        <p>de 15h à 19h</p>
                        </div>
                        <div class="progress">
                        <p>disponibilité</p>
                        <div class="progress_wrapper">
                            <div class="progress_bar" style={{ width:state.SDR.rooms[roomId].availibility_percentage + "%", backgroundColor:displayColor(state.SDR.rooms[roomId].room.name)}}></div>
                        </div>
                        </div>
                    </div>
                    </div>
                    )
                })
            )
        }
    }
     function displayMeteo(d, s, id) {
         var js, fjs = d.getElementsByTagName(s)[0];

         if (!d.getElementById(id)) {
             js = d.createElement(s);
             js.id = id;
             js.src = 'https://weatherwidget.io/js/widget.min.js';
             fjs.parentNode.insertBefore(js, fjs);
         }
     }
    return (
    <div className='allContent'>
        <div className="blocMeteo">
            <section class="sidebar bloc meteo">
                <div class="qr-wrapper">
                    <div class="message-box">
                    <div class="message-box_emoji"><span>🤳</span></div>
                    <p class="message-box_text">Réservez votre salle!</p>
                    </div>
                    <img src='https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fmembers.deskeo.fr%2F&chs=180x180&choe=UTF-8&chld=L|2' alt=''/>
                </div>
                <div class="meteo">
                    <a class="weatherwidget-io" href="https://forecast7.com/fr/45d764d84/lyon/" data-label_1="LYON" data-label_2="Météo du jour" data-font="Open Sans" data-icons="Climacons Animated" data-days="5" data-theme="pure">LYON Météo du jour</a>
                    {displayMeteo(document,'script','weatherwidget-io-js')}
                </div>
            </section>
        </div>
        <div className="content">
            <header>
                <img src="http://www.deskeo.fr/wp-content/uploads/2019/05/logo-deskeo-knotel-black-164.png" width="150px"/>
                <h1 class="title">
                    Disponibilité des SDR
                    <span>Lyon République - le 25/10/2019 à 15h00</span>
                </h1>
            </header>
            <section class="rooms bloc container">
                <section class="list sdr">
                    {displayRoomList()}
                </section>
            </section>
        </div>
    </div>
    );
}
const SDRMeteo = connect(stateSDRMeteo,dispatchSDRMeteo)(SDRMeteoConnect)

export default SDRMeteo