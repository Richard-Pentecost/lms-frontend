import { NavLink } from 'react-router-dom'; 
import classes from '../style/SettingsSidebarLink.module.scss';

const SettingsSidebarLink = ({ children, link }) => (
  <li className={classes.sidebarLink}>
    <NavLink to={link} className={classes.sidebarLink__link} activeClassName={classes.active}>
      <span className={classes.sidebarLink__text}>{children}</span>
    </NavLink>
  </li>
);

export default SettingsSidebarLink;
