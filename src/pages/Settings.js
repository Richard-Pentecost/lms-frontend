import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ProfileSidebar from '../components/SettingsSidebar';
import Profile from './Profile';
import CreateUser from './CreateUser';
import FarmList from './FarmList';
import classes from '../style/Settings.module.scss';

const Settings = () => {
  const { path } = useRouteMatch();

  return (
    <div className={classes.settings}>
      <div className={classes.settings__sidebar}>
        <ProfileSidebar />
      </div>
      <div className={classes.settings__main}>
        <Switch>
          <Route path={`${path}/profile`} component={Profile} />
          <Route path={`${path}/create-user`} component={CreateUser} />
          <Route path={`${path}/farms`} component={FarmList} />
        </Switch>
      </div>
    </div>
  );
}

export default Settings;
