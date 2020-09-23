import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel'
import ContentTab from './AdminTabSlide1/Content';
import ContentTab2 from './AdminTabSlide2/index';



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
                    <Tabs value={value} onChange={handleChange} >
                        <Tab value="one" label="Gestion slide 1" {...a11yProps('one')} />
                        <Tab value="two" label="Gestion slide 2" {...a11yProps('two')} />
                        <Tab value="three" label="Gestion slide 3" {...a11yProps('three')} />
                    </Tabs>
                    
                </div>
            </AppBar>
         
            <TabPanel value={value} index="one">
                <ContentTab/>
            </TabPanel>
        
                <ContentTab2 value={value} index="two"/>

            <TabPanel value={value} index="three">
                Tab
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