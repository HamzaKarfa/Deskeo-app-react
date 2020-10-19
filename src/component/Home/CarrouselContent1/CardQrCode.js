import React from 'react';
import QRCode from "react-qr-code";
import './styles.css';


export default function CardQrCode() {

    return (
        <section className="contentqrCode">
            <div className="qr-wrapper">
                <div className="message-box">
                    <div className="message-box_emoji"><span>🤳</span></div>
                    <p className="message-box_text">Participez à la communauté !</p>
                </div>
                <div className="qrCodeBox">
                    <QRCode value="http://living-app.kaffein.agency:3001/users"  size='200' />   
                </div>
                <div className="detail-box">
                    <p className="detail-box_text">
                    Flashez le QR code et postez une phrase et une image. <b>Serez-vous sélectionné pour être affiché ?</b>
                    </p>
                </div>
            </div>
        </section>
    )}

 