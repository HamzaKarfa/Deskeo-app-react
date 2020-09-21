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
import { connect } from 'react-redux';
import { addPhrase } from "../../action";


const stateModal = (state, props) => {
  return { props: props, state : state };
};
const dispatchModal =(dispatch,props) =>{
  return {
      addPhrases: () => { dispatch(addPhrase(props.Users)) },
    }
 };
const ModalConnect = ({addPhrases,props}) => {

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const ActionButton = () => {
      addPhrases()
      setOpen(false);
    };
    
    function displayImg(image){
      if (image === null) {
          return <p>Aucune Image</p>
      }else {
          return (<img src ={image} width="200px" height="200px" alt='logo'/>)
      }
    }

    return (
        <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Voir le post
        </Button>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {props.Users.phrases_of_day}
            
            </DialogTitle>
            <DialogContent dividers>
            <Typography gutterBottom>
                
                {displayImg(props.Users.image)} 
            </Typography>
            </DialogContent>
            <DialogActions>
              <Link to="/">
                <Button autoFocus onClick={ActionButton} to="/" color="primary">
                    Mettre en avant
                </Button>
              </Link>
            </DialogActions>
        </Dialog>
        </div>
    );
}

const Modal = connect(stateModal,dispatchModal)(ModalConnect)
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
