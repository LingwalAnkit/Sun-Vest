import React, { useRef, useState } from 'react'
import './achievement.css'
import { FaAward, FaProjectDiagram, FaUser } from 'react-icons/fa';
import Odometer from 'react-odometerjs'
import { PiMicrosoftTeamsLogoDuotone } from 'react-icons/pi';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

const Achievement = () => {

    const [clients, setClients] = useState(0)
    const [projects, setProjects] = useState(0)
    const [teams, setTeams] = useState(0)
    const container = useRef(null)
    const [award, setAward] = useState(0)
    const updateData = () => {
        const timeout = setTimeout(() => {
            setClients(120)
            setProjects(150)
            setTeams(40);
            setAward(69);
        }, 500)

        return () => clearTimeout(timeout)

    }

    const resetData = () => {
        setClients(0)
        setProjects(0)
        setTeams(0);
        setAward(0);
    }

    useGSAP(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 4,
                onEnter: updateData,
                onLeaveBack: resetData,
            }
        })
        return () => timeline.revert();
    }, { scope: container })

    return (
        <div className='achievement__container' ref={container}>
            <div className='container'>


                <div className="achievement">
                    <div className="icon__container">
                        <FaUser />
                    </div>
                    <div className="details">
                        <div className="row">
                            <Odometer
                                value={clients}
                                className='title'
                            />
                            <h1 className="title">K</h1>
                        </div>
                        <small className='text__muted'>Happy Customers</small>
                    </div>
                </div>


                <div className="achievement">
                    <div className="icon__container">
                        <FaProjectDiagram />
                    </div>
                    <div className="details">
                        <div className="row">
                            <Odometer
                                value={projects}
                                className='title'
                            />
                            <h1 className="title">+</h1>
                        </div>
                        <small className='text__muted'>Completed Projects</small>
                    </div>
                </div>


                <div className="achievement">
                    <div className="icon__container">
                        <PiMicrosoftTeamsLogoDuotone />
                    </div>
                    <div className="details">
                        <div className="row">
                            <Odometer
                                value={teams}
                                className='title'
                            />
                            <h1 className="title">+</h1>
                        </div>
                        <small className='text__muted'>Expert Workers</small>
                    </div>
                </div>


                <div className="achievement">
                    <div className="icon__container">
                        <FaAward />
                    </div>
                    <div className="details">
                        <div className="row">
                            <Odometer
                                value={award}
                                className='title'
                            />
                            <h1 className="title">+</h1>
                        </div>
                        <small className='text__muted'>Awards</small>
                    </div>
                </div>


            </div>
        </div>


    )
}

export default Achievement