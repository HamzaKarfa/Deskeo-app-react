import React,{useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import '../Admin.css'


const Modal = (props) => {


    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const ActionButton = (button) => {
      if (props.varRequest !== '') {
        props.setRequest('')
      }
      if (button === '1') {
        props.Image(props.varImage.concat([props.Users]))
        props.ImageId(props.varImageId.concat([props.Users.id]))
      } else {
        if (props.varImages.length >= 3) {
          alert('Vous ne pouvez pas mettre plus de 3 images sur cette slide')
        }else{
          props.Images(props.varImages.concat([props.Users]))
          props.ImagesId(props.varImagesId.concat([props.Users.id]))
        }
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

export default Modal;



const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

