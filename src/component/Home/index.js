import React from 'react';
import CardQrCode from './CarouselContent1/CardQrCode';
import CardComponent from './CarouselContent1/CardComponent';
import FullScreenImage from './CarouselContent2/FullScreenImage';
import SDRApp from './CarouselContent3/';
import './home.css'

//------------------//
import Carousel from 'react-material-ui-carousel'

 const Home = () => {
    var items = [
        {
            content: 
                <main class="main">
                    <section class="rooms bloc">
                        <CardComponent/>
                    </section>
                    <section class="rooms bloc" style={{width:"100vh"}}>
                        <CardQrCode/>
                    </section>
                </main>
        },
        {
            content: 
            <main class="main">
                <section class="rooms bloc">
                    <FullScreenImage/>
                </section>
            </main>
        },
        {
            content: 
            <main class="main">
                <section class="rooms bloc">
                    <SDRApp/>
                </section>
            </main>
        }
    ]
    return (
        <React.Fragment>
            <header>
                <img src="http://www.deskeo.fr/wp-content/uploads/2019/05/logo-deskeo-knotel-black-164.png" class="toggle-app" title="Click to toggle view" alt='logo'/>
                <p>le 20 novembre 2019 à 19:34</p>
            </header>
            <Carousel interval={5000} timeout={1000} animation={'slide'}>
                    {
                        items.map( (item, i) => {
                            return (
                                <>
                                {item.content}
                                
                                </>
                            )
                        })
                    }
            </Carousel>
        </React.Fragment>
    );
}
export default Home ;