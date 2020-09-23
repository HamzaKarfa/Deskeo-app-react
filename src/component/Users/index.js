import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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
        if (image !== '' || phrase !== '') {
            fetch('http://localhost:3003/newUsers',{
                method:'post',
                body: formData
            })
            alert("Merci d'avoir participé")
            window.location.href = ""
        }
    }
    function displayImg(){
        if (image !== '') {
            return (<img src={URL.createObjectURL(image)} style={{ width: "100px" }} alt=''/>)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <header>
                <img src="http://www.deskeo.fr/wp-content/uploads/2019/05/logo-deskeo-knotel-black-164.png" class="toggle-app" title="Click to toggle view" alt='logo'/>
                </header>
                <div style={{marginTop:'20px'}}>
                    <form name='form' action="" method='post' style={{display:'flex', flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <input 
                            style={{margin: '10px',}}
                            id="id-for-upload-file" 
                            name="phrase" 
                            onChange={(e)=> setPhrase(e.target.value)} 
                            type="text"
                        />
                         {displayImg()}
                        <Button variant="contained" component="label" style={{margin: '10px',}} >
                            Upload File
                            <input id="id-for-upload-file" name="file" onChange={(e)=> setImage(e.target.files[0])} type="file"  style={{ display: "none" }}/>
                        </Button>

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
                        >Valider </Button>
                    </form>
                </div>
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
            background: '#1db996',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 48,
            padding: '0 30px',
        }
    }))
