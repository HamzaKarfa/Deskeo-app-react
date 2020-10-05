import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { updateContentCC2 } from "../../../action";
import { updateContentCC3 } from "../../../action";
import '../Admin.css'

const stateModal = (state, props) => {
  return { props: props, state : state };
};
const dispatchModal =(dispatch,props) =>{
  return {
    updateStateContentCC2: () => { dispatch(updateContentCC2(props.Users)) },
    updateStateContentCC3:()=>{ dispatch(updateContentCC3(props.Users)) }
    }
 };
const ModalConnect = ({updateStateContentCC2,props,updateStateContentCC3,state}) => {

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const ActionButton = (button) => {
      if (button === '1') {
        updateStateContentCC2()
      } else {
        console.log(state.ImageCarrouselContent3)
        updateStateContentCC3()
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
                    Voir l'image
                </Button>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>

                    <DialogContent dividers className='modalTitle'>
                        <Typography gutterBottom>
                            {displayImg(props.Users.images_path)} 
                        </Typography>
                    </DialogContent>
                    <MuiDialogActions>
                            <Button onClick={() => {ActionButton('1')}}  variant="outlined" color="primary">
                                Mettre sur la slide image unique
                            </Button>
                            <Button onClick={() => {ActionButton('2')} }  variant="outlined" color="primary">
                                Mettre sur la slide multiple images
                            </Button>
                    </MuiDialogActions>
                </Dialog>
            </div>
    );
}

const Modal = connect(stateModal,dispatchModal)(ModalConnect)
export default Modal;



const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

