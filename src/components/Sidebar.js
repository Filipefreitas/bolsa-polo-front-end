import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
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
        <Menu aria-label="Main Navigation">
            <nav className="bm-menu">
                <ul className="bm-item-list" style={{ listStyle: 'none', padding: 0 }}>
                    <li>
                        <NavLink to="/main" className="bm-item" role="menuitem" aria-label="Home">
                            <MdHome aria-hidden="true" className='fa'/>
                            <span>Inicio</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/new-vouchers" className="bm-item" role="menuitem" aria-label="Register Vouchers">
                            <FaTicketAlt aria-hidden="true" className='fa'/>
                            <span>Cadastrar</span>
                        </NavLink>
                    </li>

                    <li>
                        <a onClick={handleDropdownClick} aria-haspopup="true" aria-expanded={isDropdownOpen} className="bm-item">
                            <FaRegUserCircle aria-hidden="true" className='fa'/>
                            <span>Usuários {isDropdownOpen ? '▲' : '▼'}</span>
                        </a>
                        
                        {isDropdownOpen && (
                            <ul style={{ listStyle: 'none', padding: '0 0 0 20px' }}>
                                <li>
                                    <NavLink to="/registration" className="bm-item" role="menuitem" aria-label="Register User">
                                        <IoMdPersonAdd aria-hidden="true" className='fa'/>
                                        <span>Cadastrar</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/users" className="bm-item" role="menuitem" aria-label="View Users">
                                        <MdToggleOn aria-hidden="true" className='fa'/>
                                        <span>Ver usuários</span>
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
        </Menu>
    );
};

export default Sidebar;