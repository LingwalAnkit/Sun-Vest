import React from 'react';
import './logo.css'
import { PiSolarPanelFill } from 'react-icons/pi'

const Logo = () => {
    return (
        <div className='logo'>
            <PiSolarPanelFill 
            className='icon'
            />
            <h1 className='name'>Sun<span className="color__primary">Vest</span> </h1>
        </div>
    )
}

export default Logo