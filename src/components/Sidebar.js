import React, { useState } from 'react';
import {Link} from "react-router-dom"
import { slide as Menu } from 'react-burger-menu';
import { MdHome } from "react-icons/md";
import { FaTicketAlt } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { MdToggleOn } from "react-icons/md";

import '../css/App.css';

const Sidebar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };

    return (
        <Menu>
            <main>
                <div className="bm-menu">
                    <nav className="bm-item-list">
                        <a className="bm-item">
                            <Link to = "/main">
                                <MdHome id="home" className="bm-item fa"/>
                                <span>Inicio</span>
                            </Link>
                        </a>

                        <a className="bm-item">
                            <Link to = "/new-vouchers">
                                <FaTicketAlt id="new-vouchers" className="bm-item fa"/>
                                <span className='text'>Cadastrar</span>
                            </Link>
                        </a>
        
                        <div className="bm-item">
                            <div onClick={handleDropdownClick}>
                                <FaRegUserCircle id="registration" className="bm-item fa"/>
                                <span>Usuários {isDropdownOpen ? '▲' : '▼'}</span>
                            </div >

                            {isDropdownOpen && (
                                <div>
                                    <a className="bm-item left-10">
                                        <Link to = "/registration">
                                            <IoMdPersonAdd id="new-vouchers" className="bm-item fa"/>
                                            <span className='text'>Cadastrar</span>
                                        </Link>
                                    </a>
                                    
                                    <a className="bm-item left-10">
                                        <Link to = "/users">
                                            <MdToggleOn id="user-list" className="bm-item fa"/>
                                            <span className='text'>Ver usuários</span>
                                        </Link>
                                    </a>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </main>
        </Menu>
    );
  };    

export default Sidebar;