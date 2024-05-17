import React from 'react';
import {Link} from "react-router-dom"
import { slide as Menu } from 'react-burger-menu';
import { MdHome } from "react-icons/md";
import { FaTicketAlt } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";


import '../css/App.css';

const Sidebar = () => {
    return (
        <Menu>
            <main>
                <div className="bm-menu">
                    <nav className="bm-item-list">
                        <a className="bm-item">
                            <Link to = "/">
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

                        <a className="bm-item">
                            <Link to = "/registration">
                                <FaRegUserCircle id="registration" className="bm-item fa"/>
                                <span>Usuários </span>
                            </Link>
                        </a>
                    </nav>
                </div>
            </main>
        </Menu>
    );
  };    

export default Sidebar;