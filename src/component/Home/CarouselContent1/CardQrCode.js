import React from 'react';
import QRCode from "react-qr-code";
import '../home.css'

export default function CardQrCode() {

    return (
        <section class="sidebar">
            <div class="qr-wrapper">
                <div class="message-box">
                    <div class="message-box_emoji"><span>🤳</span></div>
                    <p class="message-box_text">Envoyez votre phrase et votre image du jour</p>
                </div>
            </div>
            <div>
                <div class="qrCodeBox">
                    <QRCode value="/users" size={150} />   
                </div>    
            </div>
        </section>
    )}

 