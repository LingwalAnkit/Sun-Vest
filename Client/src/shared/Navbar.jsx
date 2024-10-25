import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { navTabs } from '../data';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { RiMenu3Fill } from 'react-icons/ri';
import Logo from '../Components/logo/Logo';
import { FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [activeNavbar, setActiveNavbar] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        setActiveNavbar(currentScrollPos > 50);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${activeNavbar ? 'active' : ''}`}>
            {open && <div className='sidebar__overlay' onClick={() => setOpen(false)}></div>}

            <Logo />
            <div className={`box nav__tabs ${open ? 'visible' : ''}`}>
                <div className="icon__container cancel__btn" onClick={() => setOpen(false)}>
                    <FaTimes />
                </div>
                {navTabs.map((tab, index) => (
                    <div
                        key={index}
                        className='tab'
                        onClick={() => {
                            // Navigate to the corresponding section (if any)
                            navigate(`/${tab.id}`);
                            setOpen(false);
                        }}
                    >
                        {tab.name}
                    </div>
                ))}
            </div>
            <div className='box'>
                <div
                    className='btn register__btn'
                    onClick={() => navigate('/register')} // Use navigate for Register
                >
                    Register
                </div>
                <div className='icon__container menu__btn' onClick={() => setOpen(!open)}>
                    <RiMenu3Fill />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
