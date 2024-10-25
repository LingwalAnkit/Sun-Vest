import '../landingpage.css';
import Navbar from '../shared/Navbar';
import React from 'react'
import Header from './header/Header';
import Achievement from './Achievement/Achievement';

const Home = () => {
    return (<>
        <Navbar />
        <Header />
        <Achievement/>
    </>
    )
}

export default Home