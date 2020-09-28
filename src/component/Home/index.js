import React from 'react';
import { connect } from 'react-redux';
import CardQrCode from './CarrouselContent1/CardQrCode';
import CardComponent from './CarrouselContent1/CardComponent';
import FullScreenImage from './CarrouselContent2/FullScreenImage';
import FullScreenImages from './CarrouselContent3/FullScreenImage2';
import SDRApp from './CarrouselContent4/';
import SDRAppMeteo from './CarrouselContent5/';
import './home.css';
import Carousel from 'react-material-ui-carousel';

const stateHome = (state) => {
    return { state : state };
};
const HomeConnect =React.memo( function HomeConnect({state, props}) { 

    function slideImage(){
        if ( state.ImageCarrouselContent1.image !== null || state.ImageCarrouselContent1.phrase !== null) {
            items.push(
                {  content: 
                    <main className="five">
                        <header>
                            <img src="http://www.deskeo.fr/wp-content/uploads/2019/05/logo-deskeo-knotel-black-164.png" className="toggle-app" title="Click to toggle view" alt='logo'/>
                        </header>
                        <div className="wrapper">
                            <CardQrCode/>
                            <CardComponent/>
                        </div>
                    </main>
                },
            )
        }
        if ( state.ImageCarrouselContent2.image !== null ) {
            items.push(
            {  content: 
                <main className="four">
                    <header>
                        <img src="http://www.deskeo.fr/wp-content/uploads/2019/05/logo-deskeo-knotel-black-164.png" className="toggle-app" title="Click to toggle view" alt='logo'/>
                        <p>le 20 novembre 2019 à 19:34</p>
                    </header>
                    <FullScreenImage/>
                </main>
            },
            )
        }
        if ( state.ImageCarrouselContent3.length !== 0) {
            items.push(
            {  content: 
                <main className="thrid">
                    <header>
                        <img src="http://www.deskeo.fr/wp-content/uploads/2019/05/logo-deskeo-knotel-black-164.png" className="toggle-app" title="Click to toggle view" alt='logo'/>
                        <p>le 20 novembre 2019 à 19:34</p>
                    </header>
                    <FullScreenImages/>
                </main>
            },
            )
        }
    }
    
    var items = [
        {  content: 
            <main className="first container">
                   <SDRAppMeteo/>
            </main>
        },
        {  content: 
            <main className="second">
                <SDRApp/>
            </main>
        },
    ]
    slideImage()
    return (
        <>
            <Carousel interval={9000} timeout={3000} animation={'slide'} indicators={false} navButtonsAlwaysInvisible className="container">
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
        </>
    );
})

const Home = connect(stateHome)(HomeConnect)

export default Home ;