import React from 'react'
import './about.css'
import { company__photo } from '../../assets'
import { FaCheck } from 'react-icons/fa'
import { Link } from 'react-scroll'

const About = () => {
    return (
        <section id='about'>

            <div className="container">
                <div className="column company__photo">
                    <img src={company__photo} alt="SunVest" />
                </div>
                <div className="column">
                    <h3 className="sub__title">
                        Starting With New Enthusiasm
                    </h3>
                    <h1 className='sub__title'>Turning Your <span className='g-text'>vision </span>into reality by focusing on the basics</h1>
                    <p className='text-muted'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis placeat accusantium molestias, itaque sapiente nostrum voluptatibus, illo ullam, possimus saepe laboriosam nemo hic consequuntur ratione necessitatibus culpa! Dicta, error minus.
                    </p>
                    <div className="group">
                        <div className="row">
                            <div className="icon__container">
                                <FaCheck />
                            </div>
                            <div className="details">
                                <p className="text__muted">
                                    Consultation
                                </p>
                                <h3>Free</h3>
                            </div>
                        </div>

                        <div className="row">
                            <div className="icon__container">
                                <FaCheck />
                            </div>
                            <div className="details">
                                <p className="text__muted">
                                    Expert
                                </p>
                                <h3>Engineers</h3>
                            </div>
                        </div>

                        <div className="row">
                            <div className="icon__container">
                                <FaCheck />
                            </div>
                            <div className="details">
                                <p className="text__muted">
                                    Customer
                                </p>
                                <h3>Support</h3>
                            </div>
                        </div>

                        <div className="row">
                            <div className="icon__container">
                                <FaCheck />
                            </div>
                            <div className="details">
                                <p className="text__muted">
                                    Quality
                                </p>
                                <h3>Service</h3>
                            </div>
                        </div>

                        <div className='buttons__container'>
                            <Link to='project' smooth={true} className='btn'>
                                Explore
                            </Link>
                            <Link to='contact' smooth={true} className='btn btn__primary'>
                                Get A Quote
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

        </section>
    )
}

export default About