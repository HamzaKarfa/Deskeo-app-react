import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


export default function Users() {
    const classes = useStyles();
    const [phrase, setPhrase] = useState('');
    const [image, setImage] = useState('');

    function addFile(){
        var formData = new FormData();
        formData.append("image", image );
        formData.append('name', phrase);
        if (image !== '') {
            console.log(image)
            fetch('http://localhost:3003/newUsers',{
                method:'post',
                body: formData
            })
        }
    }


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
                    <form name='form' action="">
                        <input id="id-for-upload-file" name="phrase" onChange={(e)=> setPhrase(e.target.value)} type="text"/>
                        <input id="id-for-upload-file" name="file" onChange={(e)=> setImage(e.target.files[0])} type="file"/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={(e)=> { 
                                e.preventDefault()
                                addFile()
                            }}
                        />
                    </form>
            </div>
        </Container>
    )

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
        }
    }))
