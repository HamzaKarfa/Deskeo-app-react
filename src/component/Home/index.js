import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CardQrCode from './CardQrCode';
import CardComponent from './CardComponent';


 const Home = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
        <Typography component="h1" variant="h2" align="center" color="textPrimary" className={classes.heroContent}>
            Living App
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p" className={classes.heroContent}>
          Scannez le QR Code pour envoyer votre phrase et votre photo du jour.
        </Typography>
        <Container maxWidth="md" component="main">
            <Grid container className={classes.gridComponent} alignItems="center" direction="row" justify="space-evenly" spacing={2} >
                <CardComponent/>
                <CardQrCode/>
            </Grid>
        </Container>
    </React.Fragment>
  );
}
export default Home ;
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
      padding: theme.spacing(4, 0, 4),
      backgroundColor:'#1B073E',
      color:'white'
    },
    cardHeader: {
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    gridComponent: {
        margin: 10
      },
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing(2),
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
  