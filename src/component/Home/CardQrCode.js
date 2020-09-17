import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import QRCode from "react-qr-code";


export default function CardQrCode() {
    const classes = useStyles();
  
    return (
              <Grid xs={12} sm={6} md={4} spacing={2} >
                <Card className={classes.cardPosition}>
                  <CardHeader
                    title='Participez'
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    className={classes.cardHeader}
                  />
                  <CardContent className={classes.cardContent}>
                    <ul>
                        <Typography component="li" align="center" >

                            <li>Scannez le QR Code</li>
                            <li>Ajouter votre phrase du jour ou votre image</li>
                            <li>Envoyez</li>
                        </Typography>
                    </ul>
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                      <Typography color="textPrimary">
                          <QRCode value="/users" size={150} />
                      </Typography>
                  </CardActions>
                </Card>
              </Grid>
    );
  }

  const useStyles = makeStyles((theme) => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
    heroContent: {
      padding: theme.spacing(8, 0, 6),
    },  
    cardPosition: {
        height:448
    },
    cardHeader: {
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardContent:{
        margin:15,
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      marginBottom: theme.spacing(2)
    },
    footer: {
      borderTop: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(8),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
      },
    },
  }));