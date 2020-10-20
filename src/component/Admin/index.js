import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel'
import ContentTab from './AdminTabSlide1/Content';
import ContentTab2 from './AdminImageFullScreenList/index';
import ContentTab3 from './AdminFormAddImage/index';
import './Admin.css'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';


function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

function Admin() {


    const [phraseDuJour, setPhraseDuJour] = useState('');
    const [imageFullScreen, setImageFullScreen] = useState([]);
    const [MultipleImageFullScreen, setMultipleImageFullScreen] = useState([]);
    const [IdMultipleImageFullScreen, setIdMultipleImageFullScreen] = useState([]);
    const [IdImageFullScreen, setIdImageFullScreen] = useState([]);
    const [responseRequest, setResponseRequest] = useState('');

    const classes = useStyles();
    const [value, setValue] = useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function displayElementTableMultipleImageFS(){
        if (MultipleImageFullScreen.length>0) {
        return (   
            Object.keys(MultipleImageFullScreen).map((key)=> {
                return (
                    <img src={MultipleImageFullScreen[key].images_path} className={classes.imageTable} alt=''/>
                    )
                })
            )
        }
    }
    function displayElementTableImageFS(){
        if (imageFullScreen.length>0) {
        return (   
            Object.keys(imageFullScreen).map((key)=> {
                return (
                    <img src={imageFullScreen[key].images_path} className={classes.imageTable} alt=''/>
                    )
                })
            )
        }
    }
    function sendAdminChoice(){

        var formData = new FormData();
        formData.append("phraseDuJour", phraseDuJour.id);
        formData.append("ImageFullScreen", IdImageFullScreen);
        formData.append("MultipleImageFullScreen", IdMultipleImageFullScreen);
        fetch('http://living-app-api.kaffein.agency:3006/adminChoice',{
            method:'post',
            body: formData
        }).then((response)=>{return response.json()})
        .then((data)=>{setResponseRequest(data) })
    }
    function resetMultipleImage(){
        setIdMultipleImageFullScreen([])
        setMultipleImageFullScreen([])
    }
    function resetImageFS(){
        setIdImageFullScreen([])
        setImageFullScreen([])
    }
    function displayResponseRequest(){
        if (responseRequest !== '') {            
            return (
                <h3 className='requestResponse'>{responseRequest}</h3>
            )
        }
    }
    function displayTable(){
        return (
            <div className='table'>
                {displayResponseRequest()}
                <table className={classes.center}>
                    <thead>
                    <tr>
                        <th>Phrase du jour selectionné</th>
                        <th>Image plein écran</th>
                        <th>Multiple image plein écran</th>
                    </tr>
                    </thead>
                    <tbody >
                    <tr>
                        <td className="contentTable">
                            {phraseDuJour.phrases_of_day}<br/><img src={phraseDuJour.image} className={classes.imageTable} alt=''/>
                            <br/>     
                            <DeleteIcon
                                onClick={()=>{setPhraseDuJour('')}}
                                type="delete"
                                style={{height:'55px',width:'35px',color: "#CC160B" }}
                                theme="outlined"
                            />
                        </td>
                        <td className="contentTable">
                            {displayElementTableImageFS()}
                            <br/>     
                            <DeleteIcon
                                onClick={()=>{resetImageFS()}}
                                type="delete"
                                style={{height:'55px',width:'35px',color: "#CC160B" }}
                                theme="outlined"
                            />
                        </td>
                        <td className="contentTable">
                            {displayElementTableMultipleImageFS()}
                            <br/>     
                            <DeleteIcon
                                onClick={()=>{resetMultipleImage()}}
                                type="delete"
                                style={{height:'55px',width:'35px',color: "#CC160B" }}
                                theme="outlined"
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
                <Button className='buttonSend' onClick={(()=>sendAdminChoice())}>
                    Valider les Modifications
                </Button>
            </div>
        )
    }
    return (
        <div className={classes.root}>
            <AppBar position="sticky">
                <div className='Nav'>
                    <p className='NavTitle'>Admin Page</p>
                    <Tabs value={value} onChange={handleChange} className="tabHeader" >
                        <Tab value="one" label="Gestion phrase du jour" {...a11yProps('one')} className="tabHeader"  />
                        <Tab value="two" label="Gestion image plein écran" {...a11yProps('two')} className="tabHeader" />
                        <Tab value="three" label="Ajouter des images" {...a11yProps('three')} className="tabHeader" />
                    </Tabs>
                </div>
            </AppBar>

            <TabPanel value={value} index="one">
                {displayTable()}         
                <ContentTab Phrase={setPhraseDuJour} 
                            setRequest={setResponseRequest}
                            varRequest={responseRequest}
                />
            </TabPanel>
            <TabPanel value={value} index="two">
                {displayTable()}
                <ContentTab2 Image={setImageFullScreen} 
                            Images={setMultipleImageFullScreen} 
                            ImagesId={setIdMultipleImageFullScreen} 
                            ImageId={setIdImageFullScreen} 
                            setRequest={setResponseRequest}
                            varImage={imageFullScreen}
                            varImages={MultipleImageFullScreen}
                            varImagesId={IdMultipleImageFullScreen}
                            varImageId={IdImageFullScreen}
                            varRequest={responseRequest}
                />
            </TabPanel>
            <TabPanel value={value} index="three">
                <ContentTab3/>
            </TabPanel>
            
        </div>
    );
}

export default Admin;


const useStyles = makeStyles((theme) => ({
    center:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center'  
    },
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    imageTable:{
        width:100
    }
}));