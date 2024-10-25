import './solar_system.css'
import { sun } from '../../assets'
import React from 'react'

const Solar_System = () => {
    return (
        <div className='solar__system'>
            <div className="sun">
                <img src={sun} alt="" />
            </div>
            <div className="mercury"></div>
            <div className="venus"></div>
            <div className="earth">
            </div>
            <div className="mars"></div>
            <div className="jupiter"></div>
            <div className="saturn"></div>
            <div className="uranus"></div>
            <div className="neptune"></div>
            <div className="pluto"></div>
        </div>
    )
}

export default Solar_System