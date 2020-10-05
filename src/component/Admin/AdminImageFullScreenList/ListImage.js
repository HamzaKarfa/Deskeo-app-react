import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
// import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Modal from './Modal';
import '../Admin.css'

export default function ListImage() {
    const classes = useStyles();
    const [Users, setUsers] = useState('');
    useEffect(() => {
        if (Users === '') {
            fetch('http://living-app-api.kaffein.agency:3005/images',{
                mode:'cors'
            })
            .then((response) => { 
                return response.json()})
            .then((data) => {
                setUsers(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    })      
    function displayImg(image){
        if (image === null) {
            return <img src="http://www.deskeo.fr/wp-content/uploads/2019/05/logo-deskeo-knotel-black-164.png" width="70px" height="80px" alt='logo'/>
        }else {
            return (<img src ={image} width="80px" height="80px" alt='logo'/>)
        }
    }

  return (
    <List className={classes.root}>
        {Object.keys(Users).map((key)=> 
            <>
                <ListItem alignItems="center" >
                    <ListItemAvatar className={classes.img}>
                        {displayImg(Users[key].images_path)}
                    </ListItemAvatar>
                    <Modal Users={Users[key]} key={key}/>
 
                </ListItem>  
                <Divider variant="inset" component="li" />
            </>
        )}
    </List>
  );
}

const useStyles = makeStyles((theme) => ({
    root: {
      display:'flex',
      flexDirection:'column',
      width: '50%',
    },
    img:{
        margin:'10px'
    },
    text:{
        fontStyle: 'italic'
    }
  }));