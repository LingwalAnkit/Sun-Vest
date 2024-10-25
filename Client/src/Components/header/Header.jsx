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
                        Revolutionary Home <span className="g-text">Solar System</span>
                    </h1>
                    <p className="text-muted">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere veniam molestias nihil neque ad odit blanditiis explicabo? Quae ullam consequuntur fugiat quisquam excepturi. Blanditiis voluptate praesentium, in amet placeat minima?
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