import SettingsSidebarLink from './SettingsSidebarLink';
import classes from '../style/SettingsSidebar.module.scss';

const SettingsSidebar = ({ name, isAdmin }) => (
  <nav className={classes.sidebar}>
    <ul className={classes.sidebar__list}>
      <li className={classes.sidebarHeading}>
        <span className={classes.sidebarHeading__name}>{ name }</span>
        <span className={classes.sidebarHeading__text}>Settings</span>
      </li>
      <SettingsSidebarLink link='/settings/profile'>Profile</SettingsSidebarLink>
      <SettingsSidebarLink link='/settings/security'>Change Password</SettingsSidebarLink>
      { 
        isAdmin && 
        (
          <>
            <SettingsSidebarLink link='/settings/create-user'>Create User</SettingsSidebarLink>
            <SettingsSidebarLink link='/settings/users'>Users</SettingsSidebarLink>
            <SettingsSidebarLink link='/settings/farms'>Farms</SettingsSidebarLink>
            <SettingsSidebarLink link='/settings/regions'>Regions</SettingsSidebarLink>
            <SettingsSidebarLink link='/settings/products'>Products</SettingsSidebarLink>
          </>
        )
      }
    </ul>
  </nav>
);

export default SettingsSidebar;
