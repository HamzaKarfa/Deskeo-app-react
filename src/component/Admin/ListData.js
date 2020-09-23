import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Modal from './modal';

export default function ListData() {
    const classes = useStyles();
    const [Users, setUsers] = useState('');
    useEffect(() => {
        if (Users === '') {
            fetch('http://localhost:3002/users',{
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
            return <img src="http://www.deskeo.fr/wp-content/uploads/2019/05/logo-deskeo-knotel-black-164.png" width="50px" height="50px" alt='logo'/>
        }else {
            return (<img src ={image} width="60px" height="60px" alt='logo'/>)
        }
    }

  return (
    <List className={classes.root}>
        {Object.keys(Users).map((key)=> 
            <>
                <ListItem alignItems="center" >
                    <ListItemAvatar className={classes.img}>
                        {displayImg(Users[key].image)}
                    </ListItemAvatar>
                    <ListItemText
                        primary= {Users[key].phrases_of_day}
                    />
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
    }
  }));