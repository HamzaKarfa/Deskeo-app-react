import React, { useEffect, useState } from "react";
import "./styles.css";
import { fetchRooms } from "./deskeo";

const SDR =React.memo( function SDR(props) { 
    const [rooms, setRooms] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});
    const [idle, setIdle] = useState(false);
    
    const Emoji = [ '👍', '👍', '🤔', '🥵' ];

    useEffect(() => {
        if (!idle) {
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
                    setLoading(false);
                    throw error;
                }
            })();
            setIdle(true);
        }
    }, 
    [idle],
    );
    if (!loading){
        displayPercent()
    }
    function displayPercent(){
        var ppc = document.querySelector('.progress-pie-chart')
        var percent = (totalPercent()/4)
        var deg = 360*percent/100;
        
            if (percent > 50) {
                ppc.classList.add('gt-50');
        }
        document.querySelector('.ppc-progress-fill').style.transform = 'rotate('+ deg +'deg)';
        document.querySelector('.ppc-percents span').innerHTML = percent+'%';
    }
    function totalPercent(){
        let total = 0
        Object.keys(rooms).map(roomId => {
            total += parseInt(rooms[roomId].availibility_percentage,10)
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
            {Object.keys(rooms).map(roomId => {
                return (
                <div className={displayImageRoom(rooms[roomId].room.name)}  key={roomId}>
                    <div className="item_image-wrapper">
                        <img src={rooms[roomId].room.image} alt=''/>
                    </div>
                    <div className="item_content-wrapper">
                        <h1>{rooms[roomId].room.name}</h1>
                        <div className="availability">
                            <p style={{color: displayColor(rooms[roomId].room.name)}}>{displayPlaceNumber(rooms[roomId].room.name)} personnes</p>
                            {rooms[roomId].availabilities.map((availability, j) => {
                                return (<p> de {availability.start } à { availability.end}</p>)     
                            })}
                        </div>
                        <div className="progress">
                            <p>disponibilité</p>
                            <div className="progress_wrapper">
                                <div className="progress_bar" 
                                    style={{
                                        width: rooms[roomId].availibility_percentage + "%",
                                        backgroundColor:displayColor(rooms[roomId].room.name)
                                    }}>
                                </div>
                            </div>
                            <div className="progress_emoji">
                                {displayImoji(rooms[roomId].availibility_percentage)}
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
                    <div className="progress-pie-chart" id='progress-pie-chart'>
                        <div class="ppc-progress">
                            <div class="ppc-progress-fill"></div>
                        </div>
                        <div class="ppc-percents">
                            <div class="pcc-percents-wrapper">
                                <span>%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    );
})
export default SDR
