'use-client'
import React from 'react'
import './services.css';
import { services } from '../../data';
import { Link } from 'react-scroll';
const Services = () => {
    return (
        <section id='services'>
            <div className='container'>
                <h1 className='title'> Our <span className='g-text'>Services</span></h1>
                <h3 className="sub__title text__muted">
                    We Are Trailblazers in the realm of renewable energy
                </h3>

                <div className="services__container">
                    {
                        services.map((service, index) => (
                            <div className="service" key={index}>
                                <div className="picture">
                                    <img src={service.image} alt={service.name} />
                                </div>
                                <div className="details">
                                    <h3>{service.name}</h3>
                                    <p className="text__muted description">
                                        {service.description}
                                    </p>
                                </div>
                                <div className="buttons__container">
                                    <button className='btn'>Read More</button>
                                    <Link to='contact' className='btn btn__primary'> Get Started </Link> 

                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        </section>
    )
}

export default Services