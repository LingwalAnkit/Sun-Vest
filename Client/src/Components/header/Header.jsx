import React from 'react'
import { Link } from 'react-scroll'
import { solar__skyscraper,mainimg  } from '../../assets';

import './header.css'
import Solar_System from '../solar-system/Solar_System';

const Header = () => {
    return (
        <header id='header'>
            <div className="system_wrapper">
                <Solar_System/>
            </div>
            <div className='container full__height blur-effect'>
                <div className="column">
                    <h1 className='title'>
                    Sunvest: Let the<span className="g-text"> Sun</span> Work for You and Your Community!
                    </h1>
                    <p className="text-muted">
                    Sunvest is a platform that lets you invest in community solar projects, saving on energy bills while tracking your solar production and environmental impact. Join Sunvest to power your home with clean energy and contribute to a sustainable future.
                    </p>
                    <div className="buttons__container">
                        <Link to='services' className='btn'>Our Services</Link>
                        <Link to='contact' className='btn btn__primary'>Contact Us</Link>
                    </div>
                </div>
                <div className="column">
                    <div className="image__container">
                        <img src={mainimg} alt="SunVest" />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header