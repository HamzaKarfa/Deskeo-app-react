import React from 'react';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import '../Admin.css'


const Modal = (props) => {

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const ActionButton = () => {
      props.Phrase(props.Users)
      if (props.varRequest !== '') {
        props.setRequest('')
      }

      setOpen(false);
    };
    
    function displayImg(image){
      if (image === null) {
          return <p>Aucune Image</p>
      }else {
          return (<img src ={image} width="auto" height="200px" alt='logo'/>)
      }
    }

    return (
            <div>
                <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{height:'50px', width:'150px'}}>
                    Voir le post
                </Button>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>

                    <DialogTitle id="customized-dialog-title" className='modalTitle' >
                        "{props.Users.phrases_of_day}"
                        
                    </DialogTitle>
                    <DialogContent dividers className='modalTitle'>
                        <Typography gutterBottom>
                            {displayImg(props.Users.image)} 
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Link to="/admin">
                            <Button autoFocus onClick={ActionButton} to="/" color="primary">
                                Mettre en avant
                            </Button>
                        </Link>
                    </DialogActions>
                </Dialog>
            </div>
    );
}


export default Modal;




const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
