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
                    <QRCode value="http://living-app.kaffein.agency:3001/users" />   
                <div className="detail-box">
                    <p className="detail-box_text">
                    Flashez le QR code et postez une phrase et une image. <b>Serez-vous sélectionné pour être affiché ?</b>
                    </p>
                </div>
            </div>
        </section>
    )}

 