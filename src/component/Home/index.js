import React,{useState, useEffect} from 'react';
 import CardQrCode from './CarrouselContent1/CardQrCode';
 import CardComponent from './CarrouselContent1/CardComponent';
 import FullScreenImage from './CarrouselContent2/FullScreenImage';
 import FullScreenImages from './CarrouselContent3/MultipleFullScreenImage';
import SDRApp from './CarrouselContent4/';
import SDRAppMeteo from './CarrouselContent5/';
import './home.css';
import './home2.css';
import Carousel from 'react-material-ui-carousel';

 const Home= () => {
    const [phraseDuJour, setPhraseDuJour] = useState('');
    const [imageFullScreen, setImageFullScreen] = useState('');
    const [MultipleImageFullScreen, setMultipleImageFullScreen] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    
    useEffect(() => {
        if (isLoading) {
            setIsLoading(false)
            fetch('http://living-app-api.kaffein.agency:3007/getAdminChoice')
            .then((response)=>{return response.json()})
            .then((data)=>{
                console.log(data)
                if(data[0].phrase !== null && data[0].image !== null){
                    setPhraseDuJour(data[0]);
                }
                if (data[1] !== null) {
                    setImageFullScreen(data[1]);
                }
                if (data[2] !== null) {
                    setMultipleImageFullScreen(data[2]);
                }
            })
        }
    })
    function addItem() {
        if (phraseDuJour !== '') {
            items.push(
                {   content: 
                    <>
                        <header>
                            <img src="http://www.deskeo.fr/wp-content/uploads/2019/05/logo-deskeo-knotel-black-164.png" width="150px" alt=''/>
                        </header>
                        <main className="third">
                            <CardQrCode/>      
                            <CardComponent Element={phraseDuJour}/>      
                        </main>
                    </>
                }
            )
        } 
        if (imageFullScreen.imageFullscreen != null) {
            imageFullScreen.imageFullscreen.forEach(element => {
                items.push(
                    {   content: 
                        <>
                            <header>
                                <img src="http://www.deskeo.fr/wp-content/uploads/2019/05/logo-deskeo-knotel-black-164.png" width="150px" alt=''/>
                            </header>
                            <main className="third">    
                                <FullScreenImage Element={element}/>      
                            </main>
                        </>
                    }
                )
            });
        }
        if (MultipleImageFullScreen !== '') {
            items.push(
                {   content: 
                    <>
                        <header>
                            <img src="http://www.deskeo.fr/wp-content/uploads/2019/05/logo-deskeo-knotel-black-164.png" width="150px" alt=''/>
                        </header>
                        <main className="third">    
                            <FullScreenImages Element={MultipleImageFullScreen}/>      
                        </main>
                    </>
                }
            )
        }
        
    }
    var items = [
        {  content: 
            <>
            <header>
                <img src="http://www.deskeo.fr/wp-content/uploads/2019/05/logo-deskeo-knotel-black-164.png" width="150px" alt=''/>
                <h1 class="title">
                    Disponibilité des SDR 
                    <span> Lyon République - le 25/10/2019 à 15h00</span>
                </h1>
            </header>
            <main className="first">
                <SDRAppMeteo/>      
            </main>
            </>
        },
        {  content: 
            <main className="second">
                <SDRApp/>
            </main>
        },
    ]
    addItem()
    return (
        <div className="Home">
            <Carousel interval={5000} timeout={1000} animation={'fade'} indicators={false} navButtonsAlwaysInvisible className="Carousel" >
                {
                    items.map( (item) => {
                        return (
                            <>
                            {item.content}
                            </>
                        )
                    })
                }
            </Carousel>
            <footer>
                <p>&copy; 2020 - Deskeo
                <small>a Knotel company, coded by <span>Ka</span>ffein Agency</small>
                </p>
            </footer>
        </div>
    );
}



export default Home ;