import { NavLink } from 'react-router-dom'; 
import classes from '../style/SettingsSidebarLink.module.scss';

const SettingsSidebarLink = ({ children, link }) => (
  <li className={classes.sidebarLink}>
    <NavLink 
      to={link} 
      className={({ isActive }) => 
        isActive ? `${classes.sidebarLink__link} ${classes.active}` : classes.sidebarLink__link
      }>
      <span className={classes.sidebarLink__text}>{children}</span>
    </NavLink>
  </li>
);

export default SettingsSidebarLink;
