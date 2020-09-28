import React from 'react';
import QRCode from "react-qr-code";
import '../home.css'

export default function CardQrCode() {

    return (
        <section className="sidebar bloc">
            <div className="qr-wrapper">
                <div className="message-box">
                    <div className="message-box_emoji"><span>🤳</span></div>
                    <p className="message-box_text">Participez à la communauté !</p>
                </div>
                    <QRCode value="/users" />   
                <div className="detail-box">
                    <p className="detail-box_text">
                    Flashez le QR code et postez une phrase et une image. <b>Serez-vous sélectionné pour être affiché ?</b>
                    </p>
                </div>
            </div>
        </section>
        // <section class="sidebar">
        //     <div class="qr-wrapper">
        //         <div class="message-box">
        //             <div class="message-box_emoji"><span>🤳</span></div>
        //             <p class="message-box_text">Envoyez votre phrase et votre image du jour</p>
        //         </div>
        //     </div>
        //     <div>
        //         <div class="qrCodeBox">
        //             <QRCode value="/users" size={150} />   
        //         </div>    
        //     </div>
        // </section>
    )}

 