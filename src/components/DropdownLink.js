import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../style/DropdownLink.module.scss';

const DropDownLink = ({ children, link, handleLogout, handleClick }) => {
  return (
    <div className={classes.dropDownLink} onClick={handleClick}>
      <Link to={link} className={classes.dropDownLink__link} onClick={handleLogout}>
        {children}
      </Link>
    </div>
  );
};

export default DropDownLink;
