import React from 'react';
import CardQrCode from './CardQrCode';
import CardComponent from './CardComponent';
import './home.css'

 const Home = () => {

  return (
    <React.Fragment>
        <header>
          <img src="http://www.deskeo.fr/wp-content/uploads/2019/05/logo-deskeo-knotel-black-164.png" class="toggle-app" title="Click to toggle view" alt='logo'/>
          <p>le 20 novembre 2019 à 19:34</p>
        </header>
        <main class="main">
              <section class="rooms bloc">
                <CardComponent/>
            
              </section>
              <section class="rooms bloc" style={{width:"100vh"}}>
              <CardQrCode/>
              </section>
        </main>
    </React.Fragment>
  );
}
export default Home ;