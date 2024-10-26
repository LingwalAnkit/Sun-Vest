import '../landingpage.css';
import Navbar from '../shared/Navbar';
import React from 'react'
import Header from './header/Header';
import Achievement from './Achievement/Achievement';
import About from './about/About';
import Services from './Servicess/Services';

const Home = () => {
    return (<>
        <Navbar />
        <Header />
        <Achievement/>
        <About/>
        <Services/>
    </>
    )
}

export default Home