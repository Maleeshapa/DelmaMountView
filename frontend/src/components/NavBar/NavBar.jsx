import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'


const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <nav className="sticky-top w-full z-20 top-0 start-0" >
                <div className="contact ">
                    <ul className="flex font-medium p-2">
                        <li className=" px-6">077 299 8997</li>
                        <li className="px-6">213/7, Aladeniya, Werellagama, Kandy, Sri Lanka</li>
                        <li className="px-6">info@delmamountviewhotel.com</li>
                    </ul>
                </div>
                <div className="link max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                    <div className="logo">
                        <h1>Delma Mount View</h1>
                        <p>Luxury Banquet & Rooms</p>
                    </div>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <NavLink to="/cusBooking" exact activeClassName="active"><button className="button">Book Now</button></NavLink>
                        <button
                            data-collapse-toggle="navbar-sticky"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-sticky"
                            aria-expanded={isMenuOpen ? "true" : "false"}
                            onClick={handleMenuToggle}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? '' : 'hidden'}`} id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt- font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 ">
                            <li>
                                <a href="#home" className="menu__link" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#about" className="menu__link">About</a>
                            </li>
                            <li>
                                <a href="#offers" className="menu__link">Offers</a>
                            </li>
                            <li>
                                <a href="#rooms" className="menu__link">Rooms</a>
                            </li>
                            <li>
                                <a href="#fun" className="menu__link">Event</a>
                            </li>
                            <li>
                                <a href="#gallery" className="menu__link">Gallery</a>
                            </li>
                            <li>
                                <a href="#footer" className="menu__link">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar