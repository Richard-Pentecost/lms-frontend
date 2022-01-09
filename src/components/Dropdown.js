import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DropdownLink from './DropdownLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logoutUser } from '../store/actions/authActions';
import classes from '../style/Dropdown.module.scss';

const Dropdown = () => {
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const isAdmin = useSelector(state => state.authState.token.isAdmin);

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
    dispatch(logoutUser());
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
            <ul className={classes.dropdown__list}>
              <DropdownLink link='/' handleClick={handleClick}>Home</DropdownLink>
              <DropdownLink link='/settings/profile' handleClick={handleClick}>Profile</DropdownLink>
              {
                  isAdmin && (
                  <>
                    <DropdownLink link='/settings/create-user' handleClick={handleClick}>Create User</DropdownLink>
                    <DropdownLink link='/settings/users' handleClick={handleClick}>Users</DropdownLink>
                    <DropdownLink link='/settings/farms' handleClick={handleClick}>Farms</DropdownLink>
                    <DropdownLink link='/settings/regions' handleClick={handleClick}>Regions</DropdownLink>
                    <DropdownLink link='/settings/products' handleClick={handleClick}>Products</DropdownLink>
                  </>
                )
              }
              <DropdownLink link='/' handleClick={handleClick} handleLogout={handleLogout}>Logout</DropdownLink>
            </ul>
          </nav>
        )
      }
    </div>
  );
};

export default Dropdown;
