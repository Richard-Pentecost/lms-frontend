import React from 'react';
import { Link } from 'react-router-dom';
// import lmsLogo from '../lmsLogo.png';
import classes from '../style/Navbar.module.scss';

const Navbar = ({ token, setToken }) => {
  
  const handleLogout = event => {
    event.preventDefault();
    setToken(false);
  };

  return (
    <>
      <div className={classes.logo}>
        <Link to='/home' className={classes.logo__link}>LMS</Link>
      </div>
      {
        token && (
          <div className={classes.logout}>
            <Link to='/' className={classes.logout__link} onClick={handleLogout}>Logout</Link>
          </div>
        )
      }
    </>
  )
}

export default Navbar;