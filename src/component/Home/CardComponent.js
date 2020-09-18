import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

export default function CardComponent() {
  const classes = useStyles();
  const item = 
  {
    title: 'La phrase du jour',
    phrase: '20 users included',
    image:'data:image/png;base64,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'
  }
  return (
    <Grid key={item.title} xs={12} sm={12} md={7}  >
      <Card className={classes.cardPosition}>
        <CardHeader
          title={item.title}
          titleTypographyProps={{ align: 'center' }}
          subheaderTypographyProps={{ align: 'center' }}
          className={classes.cardHeader}
        />
        <CardContent>
          <div className={classes.cardContent}>
            <Typography component="h2" variant="h3" color="textPrimary">
                <img src={item.image} alt="Logo" />
            </Typography>
          </div>
          <ul>
              <Typography component="li" variant="subtitle1" align="center" >
                <li>{item.phrase}</li>
              </Typography>
          </ul>
        </CardContent>
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
    cardContent: {
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