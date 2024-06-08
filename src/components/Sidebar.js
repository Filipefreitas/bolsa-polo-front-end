import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'
import { NavLink } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu';
import { MdHome, MdExpandLess, MdExpandMore, MdToggleOn } from "react-icons/md";
import { FaTicketAlt, FaRegUserCircle, FaTable } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { BsSendPlusFill } from "react-icons/bs";

import '../css/App.css';

const Sidebar = () => {
    const { roles } = useAuth(); 

    const [isVoucherDropdownOpen, setIsVoucherDropdownOpen] = useState(false);
    const handleVoucherDropdownClick = () => {
        setIsVoucherDropdownOpen(!isVoucherDropdownOpen);
    };

    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const handleUserDropdownClick = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
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

                    {roles === 'admin' && (
                        <li>
                            <a onClick={handleVoucherDropdownClick} aria-haspopup="true" aria-expanded={isVoucherDropdownOpen} className="bm-item">
                                <FaTicketAlt aria-hidden="true" className='fa'/>
                                <span>Vouchers {isVoucherDropdownOpen ? <MdExpandLess /> : <MdExpandMore />}</span>
                            </a>
                            
                            {isVoucherDropdownOpen && (
                                <ul style={{ listStyle: 'none', padding: '0 0 0 20px' }}>
                                    <li>
                                        <NavLink to="/new-vouchers" className="bm-item" role="menuitem" aria-label="Register User">
                                            <BsSendPlusFill  aria-hidden="true" className='fa'/>
                                            <span>Cadastrar</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/vouchers" className="bm-item" role="menuitem" aria-label="View Users">
                                            <FaTable aria-hidden="true" className='fa'/>
                                            <span>Ver vouchers</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                    )}    

                    {roles === 'admin' && (
                        <li>
                            <a onClick={handleUserDropdownClick} aria-haspopup="true" aria-expanded={isUserDropdownOpen} className="bm-item">
                                <FaRegUserCircle aria-hidden="true" className='fa'/>
                                <span>Usuários {isUserDropdownOpen ? <MdExpandLess /> : <MdExpandMore />}</span>
                            </a>
                            
                            {isUserDropdownOpen && (
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
                    )}
                </ul>
            </nav>
        </Menu>
    );
};

export default Sidebar;
