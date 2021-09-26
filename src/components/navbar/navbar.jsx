import React from 'react';
import logo from '../../assets/imgs/desktop-computer.png';
import './navbar.scss';
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";



const Navbar = (props) => {
    const history = useHistory();
    const backToHome = () => {
    history.push('./');
    }
    return(
        <div className='navbar'>
            <p className='logo-container'>
                <img className='logo' src={logo} onClick={backToHome}/>
            </p>
            <div className='options'>
                <Link to='./' className='option'>TRANG CHỦ</Link>
                <Link to='./introduct' className='option'>GIỚI THIỆU</Link>
                <Link to='./contact' className='option'>LIÊN HỆ</Link>
                <Link to='./login' className='option'>LOGIN</Link>
            </div>
        </div>
    )
}

export default Navbar;