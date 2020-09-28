import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel'
import ContentTab from './AdminTabSlide1/Content';
import ContentTab2 from './AdminImageFullScreenList/index';
import ContentTab3 from './AdminFormAddImage/index';
import { Link } from "react-router-dom";
import './Admin.css'
import Button from '@material-ui/core/Button';


function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}


function Admin() {
    const classes = useStyles();
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="sticky">
                <div className='Nav'>
                    <p className='NavTitle'>Admin Page</p>
                    <Link to='/home' className='link'>
                        <Button className='buttonLink'>
                            Valider les Modifications
                        </Button>
                    </Link>
                    <Tabs value={value} onChange={handleChange} className="tabHeader" >
                        <Tab value="one" label="Gestion phrase du jour" {...a11yProps('one')} className="tabHeader"  />
                        <Tab value="two" label="Gestion image plein écran" {...a11yProps('two')} className="tabHeader" />
                        <Tab value="three" label="Ajouter des images" {...a11yProps('three')} className="tabHeader" />
                    </Tabs>
                </div>
            </AppBar>
            <TabPanel value={value} index="one">
                <ContentTab/>
            </TabPanel>
            <TabPanel value={value} index="two">
                <ContentTab2 />
            </TabPanel>
            <TabPanel value={value} index="three">
                <ContentTab3/>
            </TabPanel>
        </div>
    );
}
export default Admin
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
}));