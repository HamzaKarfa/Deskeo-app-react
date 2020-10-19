import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './style.css';


function ContentSlide2() {
    const classes = useStyles();
    const [image, setImage] = useState('');

    function addFile(){
        var formData = new FormData();
        Object.keys(image).map((key)=> 
            formData.append("image"+key, image[key] )   
        )
        if (image !== '') {
            console.log(image,formData)
            fetch('http://living-app-api.kaffein.agency:3004/newImage',{
                method:'post',
                body: formData
            })
            alert("Image ajouté ")
        }
        
    }
    function displayImg(){
        if (image !== '') {
            return (
                <div className='imageList'>
                {Object.keys(image).map((key)=> 
                    <img src={URL.createObjectURL(image[key])} style={{ width: "100px" }} className='usersImage' alt=''/>
                )}
                </div>
            )
        }
    }
    function setAllImage(ArrayFile){
        setImage(ArrayFile)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <header>
                    <h3>Selctionner l'image</h3>
                </header>
                <div style={{marginTop:'20px'}}>
                    <form name='form' action="" method='post' style={{display:'flex', flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                         {displayImg()}
                        <Button variant="contained" component="label" style={{margin: '10px',}} >
                            Ajouter une image
                            <input id="id-for-upload-file" name="file" multiple="multiple" onChange={(e)=> {
                                    setAllImage(e.target.files)
                                }
                                } type="file"  style={{ display: "none" }}/>
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

export default ContentSlide2

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
