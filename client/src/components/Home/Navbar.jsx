import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import ReactDOM from 'react-dom'
const Navbar = () => {
    const auth = useSelector(state => state.auth);
    const {user, isLogged} = auth


    const handleLogout = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    const userLink = () => {
        return <li className="drop-nav">
            <Link to="#" className="avatar">
            <img src={user.avatarUrl} alt=""/> {user.name} <i className="fas fa-angle-down"></i>
            </Link>
            <ul className="dropdown">
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </ul>
        </li>
    }

    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0
    }
    return (
        <header class="w-full text-gray-700 bg-white  border-gray-100 shadow-sm body-font top-0 z-40 fixed sticky ">
            <div class="container flex flex-col items-start justify-between p-6 mx-auto md:flex-row ">
                <a class="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0"><Link to="/">
                    <svg class="w-auto h-5 text-gray-900 fill-current" viewBox="0 0 202 69"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M57.44.672s6.656 1.872 6.656 5.72c0 0-1.56 2.6-3.744 6.552 8.424 1.248 16.744 1.248 23.816-1.976-1.352 7.904-12.688 8.008-26.208 6.136-7.696 13.624-19.656 36.192-19.656 42.848 0 .416.208.624.52.624 4.576 0 17.888-14.352 21.112-18.824 1.144-1.456 4.264.728 3.12 2.392C56.608 53.088 42.152 69 36.432 69c-4.472 0-8.216-5.928-8.216-10.4 0-6.552 11.752-28.08 20.28-42.952-9.984-1.664-20.176-3.64-27.976-3.848-13.936 0-16.64 3.536-17.576 6.032-.104.312-.52.52-.832.312-3.744-7.072-1.456-14.56 14.144-14.56 9.36 0 22.048 4.576 34.944 7.592C54.736 5.04 57.44.672 57.44.672zm46.124 41.08c1.144-1.456 4.264.728 3.016 2.392C100.236 53.088 85.78 69 80.06 69c-4.576 0-8.32-5.928-8.32-10.4v-.208C67.58 64.32 63.524 69 61.34 69c-4.472 0-8.944-4.992-8.944-11.856 0-10.608 15.704-33.072 24.96-33.072 4.992 0 7.384 2.392 8.528 4.576l2.6-4.576s6.656 1.976 6.656 5.824c0 0-13.312 24.336-13.312 30.056 0 .208 0 .624.52.624 4.472 0 17.888-14.352 21.216-18.824zm-40.56 18.72c2.184 0 11.752-13.312 17.368-22.048l4.16-7.488c-8.008-7.904-27.248 29.536-21.528 29.536zm57.564-38.168c-2.184 0-4.992-2.808-4.992-4.784 0-2.912 5.824-14.872 7.28-14.872 2.6 0 6.136 2.808 6.136 6.344 0 2.08-7.176 12.064-8.424 13.312zm-17.68 46.592c-4.472 0-8.216-5.928-8.216-10.4 0-6.656 16.744-34.528 16.744-34.528s6.552 1.976 6.552 5.824c0 0-13.312 24.336-13.312 30.056 0 .208.104.624.624.624 4.472 0 17.888-14.352 21.112-18.824 1.144-1.456 4.264.728 3.12 2.392-6.448 8.944-20.904 24.856-26.624 24.856zM147.244.672s6.656 1.872 6.656 5.72c0 0-25.792 43.784-25.792 53.56 0 .416.208.624.52.624 4.576 0 17.888-14.352 21.112-18.824 1.144-1.456 4.264.728 3.12 2.392C146.412 53.088 131.956 69 126.236 69c-4.472 0-8.216-5.928-8.216-10.4 0-10.4 29.224-57.928 29.224-57.928zM169.7 60.16c3.848-2.392 7.904-6.864 10.816-10.92 6.656-9.464 11.544-20.696 10.504-27.352-.312-3.432-.104-4.056 3.12-2.704 5.2 2.392 11.336 8.632 2.184 22.88-5.2 8.008-12.48 15.288-19.344 19.76-2.704 1.768-6.344 3.328-9.984 4.16-.52.416-1.04.728-1.456.936-1.872 1.352-4.264 2.08-7.592 2.08-14.664 0-16.848-12.272-16.848-16.016 0-2.392 3.224-4.68 4.784-3.744.208.104.312.416.312.624 0 2.808 1.872 13.104 9.984 13.104 7.904 0 3.432-18.304 2.288-27.144-1.456 2.288-3.432 4.992-5.616 8.32-2.6 3.744-5.72 1.456-4.784 0 5.824-8.424 9.152-13.832 11.856-18.616 1.248-2.08 3.328-3.328 6.448-3.328 2.704 0 5.824 3.016 6.864 4.784.312.52 0 1.04-.52 1.144a5.44 5.44 0 00-4.368 5.408c0 6.968 2.6 17.16 1.664 24.856l-.312 1.768z"
                            fill-rule="nonzero" /></svg>
                </Link>
                </a>
                <nav class="flex flex-wrap items-center justify-center pl-6 ml-6 text-base border-l border-gray-200 md:mr-auto">
                    <a class="mr-5 font-medium hover:text-gray-900"><Link to="/">Home</Link></a>
                    <a class="mr-5 font-medium hover:text-gray-900"><Link to="/events">Events</Link></a>
                    <a class="mr-5 font-medium hover:text-gray-900"><Link to="/speakers">Speakers</Link></a>
                    <a class="mr-5 font-medium hover:text-gray-900"><Link to="/sponsors">Sponsor</Link></a>
                    <a class="mr-5 font-medium hover:text-gray-900"><Link to="/about">About</Link></a>
                    <a class="font-medium hover:text-gray-900"><Link to="/contact">Contact</Link></a>             
                </nav>
                <div class="items-center ">
                    <a class="font-medium hover:text-gray-900 mr-5"><Link to="/">Hi! Thanh Hai</Link></a>
                    <a className="fa-layer fa-fw">
                        <FontAwesomeIcon size="lg" icon={faShoppingCart}  /><span className="py-0 px-4 align-top -ml-3 text-sm font-bold">5</span>
                        </a>
                   
                    <a href="/login" class="mr-5 font-medium hover:text-gray-900"><Link to="/login">Login</Link></a>
                    <a href="/register"
                        class="px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-green-400 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease">
                        <Link to="/register">Sign up</Link>
                </a>   
                </div>
            </div>
           
        </header>
    );
}

export default Navbar;