import React, { useEffect, useState } from "react";
import { fetchRooms } from "./deskeo";
import "./stylesContent5.css";
import { connect } from 'react-redux';
import { setRoom } from "../../../action";
import { setLoading } from "../../../action";
import { setIdle } from "../../../action";
import QRCode from "react-qr-code";

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
    const [weather, setWeather] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});
    // const [idle, setIdle] = useState(false);

    useEffect(() => {
        
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=45.75&lon=4.85&exclude=hourly,minutely,current&appid=2ad44f2aedcff961d781de55927859c8')
        .then((response)=>{return response.json()})
        .then((data)=>{return setWeather(data)})
        
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
                            <h1 className="roomNameSDRMeteo">{state.SDR.rooms[roomId].room.name.substring(6)}</h1>
                            <div class="availability">
                            <p style={{color:displayColor(state.SDR.rooms[roomId].room.name)}}>{displayPlaceNumber(state.SDR.rooms[roomId].room.name)} personnes</p>
                                {state.SDR.rooms[roomId].availabilities.map((availability, j) => {
                                    return (<p> de {availability.start } à { availability.end}</p>)     
                                })}
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
     function displayMeteo() {
         if (weather.length !== 0) {
             
            return (  
            <div className='meteoList'>
                <p>LYON Météo du jour</p>
                <div className="meteoDateList">
                    <img src={"http://openweathermap.org/img/wn/" + weather.daily[0].weather[0].icon +"@2x.png"} className="todayIcon"></img>
                    <p className="todayIcon">{Math.round(weather.daily[0].temp.day-273.5)}°C</p>

                </div>
                {Object.keys(weather.daily).map(key => {
                    if (key === '0' || key>=5) {
                        return
                    }
                        var date = new Date(weather.daily[key].dt * 1000);
                        var options = { weekday: 'long'};
                        return (
                            <div className="meteoDateList">
                                <p>{ new Intl.DateTimeFormat('fr-FR', options).format(date)+' '+date.getDate()+'/'+(date.getMonth()+1)}</p>
                                <img src={"http://openweathermap.org/img/wn/" + weather.daily[key].weather[0].icon +".png"} className="icon"></img>
                                <p className="icon">{Math.round(weather.daily[key].temp.day-273.5)}°C</p>
                            </div>
                        )

                })}
            </div>
            )
         }
     }

    return (
    <div className='allContent'>

        <div className="contentMeteo content">
            <section class="blocMeteo">
                <div class="qr-wrapper">
                    <div class="message-box">
                        <div class="message-box_emoji"><span>🤳</span></div>
                        <p class="message-box_text">Réservez votre salle!</p>
                    </div>
                    <div className="qrCodeBox" >
                        <img src="https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fmembers.deskeo.fr%2F&chs=180x180&choe=UTF-8&chld=L|2" alt=''/> 
                    </div>
                </div>
                <div class="meteo">
                    {displayMeteo()}
                </div>
            </section>
        </div>
        <div className="contentSDR content">
            <section class="rooms bloc">
                <section class="list">
                    {displayRoomList()}
                </section>
            </section>
        </div>
    </div>
    );
}
const SDRMeteo = connect(stateSDRMeteo,dispatchSDRMeteo)(SDRMeteoConnect)

export default SDRMeteo