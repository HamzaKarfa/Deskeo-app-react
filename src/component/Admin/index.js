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
    const [imageFullScreen, setImageFullScreen] = useState('');
    const [MultipleImageFullScreen, setMultipleImageFullScreen] = useState([]);
    const [IdMultipleImageFullScreen, setIdMultipleImageFullScreen] = useState([]);
    const [responseRequest, setResponseRequest] = useState('');

    const classes = useStyles();
    const [value, setValue] = useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function displayElementTable(){
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
    function sendAdminChoice(){

        var formData = new FormData();
        formData.append("phraseDuJour", phraseDuJour.id);
        formData.append("ImageFullScreen", imageFullScreen.id);
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
    function displayResponseRequest(){
        if (responseRequest !== '') {            
            return (
                <h3 className='requestResponse'>{responseRequest}</h3>
            )
        }
    }
    function displayTable(){
        return (
            <table className={classes.center}>
                <thead>
                <tr>
                    <th>Phrase du jour selectionné  
                        <br/>     
                        <DeleteIcon
                            onClick={()=>{setPhraseDuJour('')}}
                            type="delete"
                            style={{height:'55px',width:'35px',color: "#CC160B" }}
                            theme="outlined"
                        />
                    </th>
                    <th>Image plein écran
                        <br/>     
                        <DeleteIcon
                            onClick={()=>{setImageFullScreen('')}}
                            type="delete"
                            style={{height:'55px',width:'35px',color: "#CC160B" }}
                            theme="outlined"
                        />
                    </th>
                    <th>Multiple image plein écran
                    <br/>     
                        <DeleteIcon
                            onClick={()=>{resetMultipleImage()}}
                            type="delete"
                            style={{height:'55px',width:'35px',color: "#CC160B" }}
                            theme="outlined"
                        />
                    </th>
                </tr>
                </thead>
                <tbody >
                <tr>
                    <td className="contentTable">{phraseDuJour.phrases_of_day}<br/><img src={phraseDuJour.image} className={classes.imageTable} alt=''/></td>
                    <td className="contentTable"><img src={imageFullScreen.images_path} className={classes.imageTable} alt=''/></td>
                    <td className="contentTable">{displayElementTable()}</td>
                </tr>
                </tbody>
            </table>
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
            <div className='table'>
                {displayResponseRequest()}
                
                <Button className='buttonSend' onClick={(()=>sendAdminChoice())}>
                    Valider les Modifications
                </Button>
            </div>

            <TabPanel value={value} index="one">
                {displayTable()}
                
                <ContentTab Phrase={setPhraseDuJour} 
                            Request={setResponseRequest}
                            varRequest={responseRequest}
                />
            </TabPanel>
            <TabPanel value={value} index="two">
                {displayTable()}
                <ContentTab2 Image={setImageFullScreen} 
                            Images={setMultipleImageFullScreen} 
                            ImagesId={setIdMultipleImageFullScreen} 
                            setRequest={setResponseRequest}
                            varImages={MultipleImageFullScreen}
                            varImagesId={IdMultipleImageFullScreen}
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