import React, { useEffect, useState } from "react";
import "./styles.css";
import { fetchRooms } from "./deskeo";
import { connect } from 'react-redux';
import { setRoom } from "../../../action";
import { setLoading } from "../../../action";
import { setIdle } from "../../../action";



const stateSDR = (state) => {
    return { state : state };
};
const dispatchSDR =(dispatch,state) =>{
    return {
        setRooms: (e) => { dispatch(setRoom(e)) },
        setLoadings:(e)=>{ dispatch(setLoading(e)) },
        setIdles:(e)=>{ dispatch(setIdle(e)) }
      }
   };

function SDRConnect({state, setRooms, setLoadings,setIdles}) {
    // const [rooms, setRooms] = useState({});
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});
    // const [idle, setIdle] = useState(false);
    
    const Emoji = [ '👍', '👍', '🤔', '🥵' ];

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
    if (state.SDR.loading === true){
        // displayPercent()
    }
    function displayPercent(){
        var ppc = document.querySelector('.progress-pie-chart')
        var percent = (totalPercent()/4)
        var deg = 360*percent/100;
        
            if (percent > 50 && ppc !== null) {
                console.log(ppc)
                ppc.classList.add('gt-50');
                document.querySelector('.ppc-progress-fill').style.transform = 'rotate('+ deg +'deg)';
                // document.querySelector('.ppc-percents span').innerHTML = percent+'%';
        }
    }
    function totalPercent(){
        let total = 0
        Object.keys(state.SDR.rooms).map(roomId => {
            total += parseInt(state.SDR.rooms[roomId].availibility_percentage,10)
        })
        return total
    }
    function displayImoji(pourcentage){
        if (pourcentage <= 25) {
            return <span role="img">{Emoji[3]}</span>
        } else if (pourcentage >25 && pourcentage <= 50 ) {
            return <span role="img">{Emoji[2]}</span>
        } else if (pourcentage >50 && pourcentage <= 75 ) {
            return <span role="img">{Emoji[1]}</span>
        }else{
            return <span role="img">{Emoji[0]}</span>
        }
    }
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
    function displayImageRoom(roomName){
        if (roomName === 'Lyon - le Bouchon') {
            return "item item_perspective-inverse"
        } else if (roomName === 'Lyon - Salle de réunion - 411' ) {
            return "item item_perspective"
        } else if (roomName === 'Lyon - Salle de réunion - 502' ) {
            return "item item_perspective"
        }else{
            return "item item_perspective-inverse"
        }
    }
    function displayRoomList(){
        return (
            <>
            {Object.keys(state.SDR.rooms).map(roomId => {
                return (
                <div className={displayImageRoom(state.SDR.rooms[roomId].room.name)}  key={roomId}>
                    <div className="item_image-wrapper">
                        <img src={state.SDR.rooms[roomId].room.image} alt=''/>
                    </div>
                    <div className="item_content-wrapper">
                        <h1>{state.SDR.rooms[roomId].room.name}</h1>
                        <div className="availability">
                            <p style={{color: displayColor(state.SDR.rooms[roomId].room.name)}}>{displayPlaceNumber(state.SDR.rooms[roomId].room.name)} personnes</p>
                            {state.SDR.rooms[roomId].availabilities.map((availability, j) => {
                                return (<p> de {availability.start } à { availability.end}</p>)     
                            })}
                        </div>
                        <div className="progress">
                            <p>disponibilité</p>
                            <div className="progress_wrapper">
                                <div className="progress_bar" 
                                    style={{
                                        width: state.SDR.rooms[roomId].availibility_percentage + "%",
                                        backgroundColor:displayColor(state.SDR.rooms[roomId].room.name)
                                    }}>
                                </div>
                            </div>
                            <div className="progress_emoji">
                                {displayImoji(state.SDR.rooms[roomId].availibility_percentage)}
                            </div>
                        </div>
                    </div>
                </div>)
            })}
            </>
        )
  }

    return (
    <>
        <section class="rooms">
            <section class="list">
                {displayRoomList()}
            </section>
        </section>
        <section class="sidebar">
            <div class="qr-wrapper">
                <div class="message-box">
                    <div class="message-box_emoji"><span>🤳</span></div>
                    <p class="message-box_text">Réservez votre salle!</p>
                </div>
                <img src="https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fmembers.deskeo.fr%2F&chs=180x180&choe=UTF-8&chld=L|2" />
            </div>
            <div class="pies-wrapper">
                <div class="pie-box">
                    <p>Disponibilité totale</p>
                    <div className="progress-pie-chart gt-50" id='progress-pie-chart'>
                        <div class="ppc-progress">
                            <div class="ppc-progress-fill" style={{transform:'rotate('+ 360*(totalPercent()/4)/100 +'deg)'}}></div>
                        </div>
                        <div class="ppc-percents">
                            <div class="pcc-percents-wrapper">
                                <span>{totalPercent()/4}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {displayPercent()}
    </>
    );
}
const SDR = connect(stateSDR,dispatchSDR)(SDRConnect)

export default SDR
