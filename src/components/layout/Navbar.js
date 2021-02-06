import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({icon,title})=> {
    return (
        <nav className='navbar bg-primary navbar1'>
            <h1>
                <i className={icon}>
                &nbsp; {title}
                </i>
            </h1>
            <ul>
                <li className='home1'>
                  <Link to="/">Home</Link>
                </li>
                <li className='about1'>
                  <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );   
}
//设置默认属性值
Navbar.defaultProps = {
  title: '循迹 Tracing',
  icon: 'fa fa-eercast'
}

// 定义属性类型
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}

export default Navbar;