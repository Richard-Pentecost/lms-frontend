import React, { useState, useRef, useEffect } from 'react';
import DropdownLink from './DropdownLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '../style/Dropdown.module.scss';

const Dropdown = ({ setToken }) => {
  const dropdownRef = useRef();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const pageClickEvent = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => window.removeEventListener('click', pageClickEvent);
  }, [isActive]);

  const handleClick = () => { 
    setIsActive(!isActive);
  };

  const handleLogout = () => {
    setToken(false);
  };

  return (
    <div className={classes.menuContainer}>
      <button className={classes.menu} onClick={handleClick}>
        <span className={classes.menu__text}>Menu</span>
        <span className={classes.menu__icon}><FontAwesomeIcon icon={'caret-down'} /></span>
      </button>
      { 
        isActive && (
          <nav className={classes.dropdown} ref={dropdownRef}>
            <ul>
              <DropdownLink link='/' handleClick={handleClick}>Home</DropdownLink>
              <DropdownLink link='/settings' handleClick={handleClick}>Profile</DropdownLink>
              <DropdownLink link='/settings/create-user' handleClick={handleClick}>Create User</DropdownLink>
              <DropdownLink link='/settings/users' handleClick={handleClick}>Users</DropdownLink>
              <DropdownLink link='/settings/farms' handleClick={handleClick}>Farms</DropdownLink>
              <DropdownLink link='/' handleClick={handleClick} handleLogout={handleLogout}>Logout</DropdownLink>
            </ul>
          </nav>
        )
      }
    </div>
  );
};

export default Dropdown;