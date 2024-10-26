import '../landingpage.css';
import Navbar from '../shared/Navbar';
import React from 'react'
import Header from './header/Header';
import Achievement from './Achievement/Achievement';
import About from './about/About';
import Services from './Servicess/Services';
import Footer from './footer/footer';

const Home = () => {
    return (<>
        <Navbar />
        <Header />
        <Achievement/>
        <About/>
        <Services/>
        <Footer></Footer>
    </>
    )
}

export default Home