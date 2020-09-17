import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


export default function Users() {
  const classes = useStyles();
  const [phrase, setPhrase] = useState('');
  const [image, setImage] = useState('');
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Living App
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="multiline"
            label="Entrez votre phrase du jour"
            name="phrase"
            autoComplete="phrase"
            autoFocus
            multiline
            onChange={(e)=> setPhrase(e.target.value)}
          />
          <label htmlFor="upload-photo">
            <input
              style={{ display: 'none' }}
              id="upload-photo"
              name="upload-photo"
              type="file"
              onChange={(e)=> setImage(e.target.value)}
            />
            <Button color="secondary" variant="contained" component="span" >
              Choisir une image
            </Button>
          </label>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e)=> { 
              e.preventDefault()
              uploadFile()
              console.log('submit' , image, phrase)}}
          >
            Envoyer
          </Button>
        </form>
      </div>
    </Container>
  );
  function uploadFile(){
      fetch('http://localhost:3003/newUsers',{
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        method:'post',
        body: JSON.stringify({a: 1, b: 2})
      })
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    background: 'linear-gradient(45deg, darkblue , purple 75%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
}));
