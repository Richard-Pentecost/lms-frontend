import SettingsSidebarLink from './SettingsSidebarLink';
import classes from '../style/SettingsSidebar.module.scss';

const SettingsSidebar = () => (
  <nav className={classes.sidebar}>
    <ul className={classes.sidebar__list}>
      <li className={classes.sidebarHeading}>
        <span className={classes.sidebarHeading__name}>UserName</span>
        <span className={classes.sidebarHeading__text}>Settings</span>
      </li>
      <SettingsSidebarLink link='/settings/profile'>Profile</SettingsSidebarLink>
      <SettingsSidebarLink link='/settings/create-user'>Create User</SettingsSidebarLink>
      <SettingsSidebarLink link='/settings/farms'>Farms</SettingsSidebarLink>
    </ul>
  </nav>
);

export default SettingsSidebar;
