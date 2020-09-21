import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import QRCode from "react-qr-code";
import './home.css'

export default function CardQrCode() {

  
    return (

        <section class="sidebar">
            <div class="qr-wrapper">
                <div class="message-box">
                    <div class="message-box_emoji"><span>🤳</span></div>
                    <p class="message-box_text">Ajoutez votre phrase du jour</p>
                </div>
            </div>
            <div>
                <div class="qrCodeBox">
                    <QRCode value="/users" size={150} />   
                </div>    
            </div>
        </section>
            //   <Grid xs={12} sm={6} md={4} spacing={2} >
            //     <Card className={classes.cardPosition}>
            //       <CardHeader
            //         title='Participez'
            //         titleTypographyProps={{ align: 'center' }}
            //         subheaderTypographyProps={{ align: 'center' }}
            //         className={classes.cardHeader}
            //       />
            //       <CardContent className={classes.cardContent}>
            //         <ul>
            //             <Typography component="li" align="center" >

            //                 <li>Scannez le QR Code</li>
            //                 <li>Ajouter votre phrase du jour ou votre image</li>
            //                 <li>Envoyez</li>
            //             </Typography>
            //         </ul>
            //       </CardContent>
            //       <CardActions className={classes.cardActions}>
            //           <Typography color="textPrimary">
            //               <QRCode value="/users" size={150} />
            //           </Typography>
            //       </CardActions>
            //     </Card>
            //   </Grid>
    )}

 